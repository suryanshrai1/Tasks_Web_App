// DOM Elements
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');

// Load tasks from localStorage
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

  const taskContent = document.createElement('div');
  taskContent.className = 'taskContent';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = completed;

  const taskTextSpan = document.createElement('span');
  taskTextSpan.textContent = taskText;
  if (completed) taskTextSpan.style.textDecoration = 'line-through';

  const dueDateSpan = document.createElement('span');
  dueDateSpan.className = 'dueDate';
  dueDateSpan.textContent = dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : '';
  dueDateSpan.dataset.rawDate = dueDate;

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'buttonContainer';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'editBtn';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'deleteBtn';

  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(deleteBtn);

  taskContent.appendChild(checkbox);
  taskContent.appendChild(taskTextSpan);
  taskContent.appendChild(dueDateSpan);

  taskItem.appendChild(taskContent);
  taskItem.appendChild(buttonContainer);
  taskList.prepend(taskItem);

  // Checkbox toggle
  checkbox.addEventListener('change', () => {
    taskTextSpan.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    saveTasks();
  });

  // Edit task
  editBtn.addEventListener('click', () => {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskTextSpan.textContent;

    const dateField = document.createElement('input');
    dateField.type = 'date';
    dateField.value = dueDateSpan.dataset.rawDate || '';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'editBtn';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'deleteBtn';

    taskContent.replaceChild(inputField, taskTextSpan);
    taskContent.replaceChild(dateField, dueDateSpan);

    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);

    inputField.focus();

    saveBtn.addEventListener('click', () => {
      const updatedText = inputField.value.trim();
      const updatedDate = dateField.value;

      if (updatedText !== '') {
        taskTextSpan.textContent = updatedText;
        dueDateSpan.textContent = updatedDate ? `Due: ${new Date(updatedDate).toLocaleDateString()}` : '';
        dueDateSpan.dataset.rawDate = updatedDate;

        taskContent.replaceChild(taskTextSpan, inputField);
        taskContent.replaceChild(dueDateSpan, dateField);
        buttonContainer.innerHTML = '';
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        saveTasks();
      } else {
        alert('Task cannot be empty.');
      }
    });

    cancelBtn.addEventListener('click', () => {
      taskContent.replaceChild(taskTextSpan, inputField);
      taskContent.replaceChild(dueDateSpan, dateField);
      buttonContainer.innerHTML = '';
      buttonContainer.appendChild(editBtn);
      buttonContainer.appendChild(deleteBtn);
    });
  });

  // Delete task
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
  });
}

// Search tasks
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  document.querySelectorAll('.taskItem').forEach(task => {
    const text = task.querySelector('.taskContent span').textContent.toLowerCase();
    task.style.display = text.includes(searchText) ? 'flex' : 'none';
  });
});

// Save to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.taskItem').forEach(item => {
    const text = item.querySelector('.taskContent span').textContent;
    const completed = item.querySelector('.checkbox').checked;
    const date = item.querySelector('.dueDate').dataset.rawDate || '';
    tasks.push({ text, completed, dueDate: date });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.reverse().forEach(task => {
    addTaskToDOM(task.text, task.dueDate, task.completed);
  });
}

