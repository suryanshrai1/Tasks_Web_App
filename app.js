// DOM Elements
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

// Load tasks from localStorage when the page loads
window.addEventListener('load', loadTasks);

// Add Task Functionality
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === '') {
    alert('Task cannot be empty!');
    return;
  }

  addTaskToDOM(taskText, dueDate);
  saveTasks();
  taskInput.value = '';
  dueDateInput.value = '';
});

// Add Task to DOM
function addTaskToDOM(taskText, dueDate, completed = false) {
  const taskItem = document.createElement('li');
  taskItem.className = 'taskItem';

  // Task content wrapper
  const taskContent = document.createElement('div');
  taskContent.className = 'taskContent';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = completed;

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = taskText;
  if (completed) {
    taskTextSpan.style.textDecoration = 'line-through';
  }

  const dueDateSpan = document.createElement('span');
  dueDateSpan.className = 'dueDate';
  dueDateSpan.textContent = dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : '';

  // Buttons container
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttonContainer';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'editBtn';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'deleteBtn';

  // Append elements
  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskTextSpan);
  taskContent.appendChild(dueDateSpan);
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);
  
  taskItem.appendChild(taskContent);
  taskItem.appendChild(buttonContainer);
  taskList.prepend(taskItem); // Adds new task at the top

  // Checkbox Functionality
  checkbox.addEventListener('change', () => {
    taskTextSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    saveTasks();
  });

  // Edit Task Functionality
  editBtn.addEventListener('click', () => {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskTextSpan.textContent;

    const dateInputField = document.createElement('input');
    dateInputField.type = 'date';
    dateInputField.value = dueDate ? dueDate : '';

    taskItem.replaceChild(inputField, taskContent);
    taskItem.replaceChild(dateInputField, buttonContainer);
    inputField.focus();

    const saveEdit = () => {
      const updatedText = inputField.value.trim();
      const updatedDate = dateInputField.value;
      if (updatedText !== '') {
        taskTextSpan.textContent = updatedText;
        dueDateSpan.textContent = updatedDate ? `Due: ${new Date(updatedDate).toLocaleDateString()}` : '';
      }
      taskItem.replaceChild(taskContent, inputField);
      taskItem.replaceChild(buttonContainer, dateInputField);
      saveTasks();
    };

    inputField.addEventListener('blur', saveEdit);
    inputField.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') saveEdit();
    });
  });

  // Delete Task Functionality
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
  });
}

// Search Filter
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const tasks = document.querySelectorAll('.taskItem');

  tasks.forEach(task => {
    const taskText = task.querySelector('.taskContent span').textContent.toLowerCase();
    task.style.display = taskText.includes(searchText) ? 'flex' : 'none';
  });
});

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.taskItem').forEach(taskItem => {
    const taskText = taskItem.querySelector('.taskContent span').textContent;
    const completed = taskItem.querySelector('.checkbox').checked;
    const dueDate = taskItem.querySelector('.dueDate').textContent.replace('Due: ', '');
    tasks.push({ text: taskText, completed, dueDate: dueDate ? new Date(dueDate).toISOString().split('T')[0] : null });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Reverse to maintain newest task at top
  tasks.reverse().forEach(task => {
    addTaskToDOM(task.text, task.dueDate, task.completed);
  });
}

