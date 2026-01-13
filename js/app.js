//Seleccionar elementos del DOM

const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');


//Estado de la aplicacion
let tasks = [];

// LocalStore
function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const storedTasks = localStorage.getItem('tasks');

    if(storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

loadTasks();

// Eventos
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskText = input.value.trim();

  if (taskText === '') {
    alert('La tarea no puede estar vacía');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  input.value = '';
});
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    // Toggle completed
    li.addEventListener('click', function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖️';

    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // evita marcar como completed
      deleteTask(task.id);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// --------------------
// Eliminar
// --------------------
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}