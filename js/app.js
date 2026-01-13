//Seleccionar elementos del DOM

const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');


//Estado de la aplicacion
let tasks = [];

//Escuchar el summit del formulario

form.addEventListener('submit', function (e){
    e.preventDefault();

    const taskText = input.value.trim();

    if(taskText === '') {
        alert('La tarea no puede estar vacía');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();

    input.value = '';
});

// Renderizar tareas

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(function(task){
        const li = document.createElement('li');

        li.textContent = task.text;

        if(task.completed){
            li.classList.add('completed');
        }

        // Botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖️';

        deleteBtn.addEventListener('click', function(){
            deleteTask(task.id);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    })
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  renderTasks();
}
