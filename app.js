// // DOM Elements
// const taskInput = document.getElementById('taskInput');
// const addTaskBtn = document.getElementById('addTaskBtn');
// const taskList = document.getElementById('taskList');
// const searchInput = document.getElementById('searchInput');

// // Load tasks from localStorage when the page loads
// window.addEventListener('load', loadTasks);

// // Add Task Functionality
// addTaskBtn.addEventListener('click', () => {
//   const taskText = taskInput.value.trim();

//   if (taskText === '') {
//     alert('Task cannot be empty!');
//     return;
//   }

//   addTaskToDOM(taskText);
//   saveTasks();
//   taskInput.value = '';
// });

// // Add Task to DOM
// function addTaskToDOM(taskText) {
//   const taskItem = document.createElement('li');
//   taskItem.className = 'taskItem';

//   const taskTextSpan = document.createElement('span');
//   taskTextSpan.textContent = taskText;
//   taskItem.appendChild(taskTextSpan);

//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = 'Delete';
//   deleteBtn.className = 'deleteBtn';
//   // deleteBtn.addEventListener('click', () => {
//   //   // taskList.removeChild(taskItem);
//   //   // saveTasks();
//   // });

//   taskItem.appendChild(deleteBtn);
//   taskList.appendChild(taskItem);
// }

// // Delete and Complete Tasks
// taskList.addEventListener('click', (event) => {
//   const target = event.target;

//   // Delete Task
//   if (target.classList.contains('deleteBtn')) {
//     const taskItem = target.parentElement;
//     taskList.removeChild(taskItem);
//     saveTasks();
//   }

//   // Complete Task (Toggle Line-Through)
//   if (target.tagName === 'SPAN') {
//     target.style.textDecoration = target.style.textDecoration === 'line-through' ? 'none' : 'line-through';
//     saveTasks();
//   }
// });

// // Search Filter
// searchInput.addEventListener('input', () => {
//   const searchText = searchInput.value.toLowerCase();
//   const tasks = document.querySelectorAll('.taskItem');

//   tasks.forEach(task => {
//     const taskText = task.querySelector('span').textContent.toLowerCase();
//     if (taskText.includes(searchText)) {
//       task.style.display = 'flex';
//     } else {
//       task.style.display = 'none';
//     }
//   });
// });

// // Edit Feature
// taskList.addEventListener('dblclick', (event) => {
//   const target = event.target;

//   if (target.tagName === 'SPAN') {
//     const currentText = target.textContent;
//     const inputField = document.createElement('input');
//     inputField.type = 'text';
//     inputField.value = currentText;

//     // Replace the span with the input field
//     target.replaceWith(inputField);
//     inputField.focus();

//     // Save the edited task on pressing Enter
//     inputField.addEventListener('keyup', (e) => {
//       if (e.key === 'Enter') {
//         const newText = inputField.value.trim();
//         if (newText !== '') {
//           target.textContent = newText;
//           inputField.replaceWith(target);
//           saveTasks();
//         }
//       }
//     });
//   }
// });

// // Save tasks to localStorage
// function saveTasks() {
//   const tasks = [];
//   document.querySelectorAll('.taskItem span').forEach(task => {
//     tasks.push({
//       text: task.textContent,
//       completed: task.style.textDecoration === 'line-through'
//     });
//   });
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// // Load tasks from localStorage
// function loadTasks() {
//   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//   tasks.forEach(task => {
//     addTaskToDOM(task.text);
//     const taskItem = taskList.lastChild;
//     if (task.completed) {
//       taskItem.querySelector('span').style.textDecoration = 'line-through';
//     }
//   });
// }


const addTaskBtn = document.querySelector("#addTaskBtn");
const taskInput = document.querySelector("#taskInput");

const taskList = document.querySelector("#taskList");

addTaskBtn.addEventListener("click",function(){
  const taskText = taskInput.value.trim();
  if(taskText === ""){
    alert("Task cannot be empty!");
    return
  }
  addTaskToDOM(taskText);
  taskInput.value = "";
});

function addTaskToDOM(taskText){
  const taskItem = document.createElement("li");
  // taskItem.classList.add("taskItem");
  taskItem.className = "taskItem";
  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;
  taskItem.appendChild(taskTextSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "deleteBtn";
  
  taskItem.appendChild(deleteBtn);
  taskList.appendChild(taskItem);
}

// delete and complete tasks

taskList.addEventListener("click",function(event){
  if(event.target.classList.contains("deleteBtn")){
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
  }
});