//Seleccionar elementos del DOM
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const filterButtons = document.querySelectorAll('.filters button');
let currentFilter = 'all';
//Busqueda de tareas
const searchInput = document.querySelector('#search-input');
let searchText = '';



filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});


//Busqueda de tarea
searchInput.addEventListener('input', () => {
  searchText = searchInput.value.toLowerCase();
  renderTasks();
});


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

  let filteredTasks = tasks;

  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (searchText !== '') {
    filteredTasks = filteredTasks.filter(task =>
      task.text.toLowerCase().includes(searchText)
    );
  }


  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add('completed');
    }

    li.addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖️';

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
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