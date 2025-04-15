const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="removeTask(this)">Done</button>`;

  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
}

function removeTask(button) {
  const taskItem = button.parentElement;
  taskList.removeChild(taskItem);
}
