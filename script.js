function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");

// Initialize tasks array to store the tasks
let tasks = [];

// Load tasks from local storage when the page loads
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks = savedTasks;
    displayTasks();
  }
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText !== "") {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.add("hidden");
    // Create a new task object
    const task = {
      uuid: create_UUID(),
      text: taskText,
      completed: false,
      date: new Date(),
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Save tasks to local storage
    saveTasks();

    // Add the task to the task list
    displayTasks();

    // Clear the input field
    inputBox.value = "";
  } else {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.remove("hidden");
    errorMessage.classList.add("text-red-400");
    errorMessage.innerHTML = "please enter a task";
  }
}

function toggleTask(index) {
  // Toggle the completed state of the task

  tasks.find((todo) => todo.uuid == index).completed = !tasks.find(
    (todo) => todo.uuid == index
  ).completed;

  // Save tasks to local storage
  saveTasks();

  // Update the task list to reflect the change
  displayTasks();
}

function deleteTask(index) {
 
      tasks.splice(index, 1);

      // Save tasks to local storage
      saveTasks();

      // Update the task list to reflect the change
      displayTasks();
    }
  
  // Remove the task from the tasks array


function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className =
      "list-item flex items-center justify-between border-b border-gray-300 py-2";
    taskItem.innerHTML = `
<div class="flex items-center">
    <input  class="mr-2 form-checkbox" ${
      task.completed ? "checked" : ""
    } onclick="toggleTask('${task.uuid}')">
    <span class="task-text ${
      task.completed ? "line-through" : ""
    }">${task.text}</span>
    <span>${task.date}</span>
</div>
<div class="flex items-center">
    <button onclick="editTask('${
      task.uuid
    }')" class="text-blue-500 mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>   
    </button>
     <button onclick="deleteTask('${
       task.uuid
       }')" class="text-red-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
       <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
     </svg></button>
        </div>
            `;
    taskList.appendChild(taskItem);
  });
}

// Edit task
function editTask(index) {
  console.log(index, "index");
  let task = tasks.find((todo) => todo.uuid == index);
  console.log("task", task);
  const updatedText = prompt("Edit the task:", task.text);
  if (updatedText !== null) {
    tasks.find((todo) => todo.uuid == index).text = updatedText;
    console.log("done");
    saveTasks();
    displayTasks();
  }
}
// Load tasks when the page loads
loadTasks();