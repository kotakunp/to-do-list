const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("addTask");
const activeList = document.getElementById("activeList");
const completedList = document.getElementById("completedList");

window.addEventListener("load", loadTasks);
addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText, false);
  activeList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
  saveTasks();
}

function removeTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
  saveTasks();
}

function completeTask(button) {
  const taskItem = button.parentElement;
  const taskText = taskItem.querySelector("span").textContent;

  const completedItem = createTaskElement(taskText, true);
  completedList.appendChild(completedItem);
  taskItem.remove();
  saveTasks();
}

function createTaskElement(text, isCompleted) {
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <span>${text}</span>
    <button>${isCompleted ? "Delete" : "Done"}</button>`;

  const btn = li.querySelector("button");
  btn.onclick = () => {
    isCompleted ? removeTask(btn) : completeTask(btn);
  };

  return li;
}

function saveTasks() {
  const activeTasks = [];
  const completedTasks = [];

  document.querySelectorAll("#activeList .task span").forEach(span =>
    activeTasks.push(span.textContent)
  );
  document.querySelectorAll("#completedList .task span").forEach(span =>
    completedTasks.push(span.textContent)
  );

  localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function loadTasks() {
  const activeTasks = JSON.parse(localStorage.getItem("activeTasks") || "[]");
  const completedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]");

  activeTasks.forEach(task => {
    const li = createTaskElement(task, false);
    activeList.appendChild(li);
  });

  completedTasks.forEach(task => {
    const li = createTaskElement(task, true);
    completedList.appendChild(li);
  });
}
