
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    updateLocalStorage();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage();
  renderTasks();
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

//sumit

renderTasks();
