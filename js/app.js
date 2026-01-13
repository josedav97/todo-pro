//Seleccionar elementos del DOM

const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const tasklist = document.querySelector('#task-list');


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

    const newTaks = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTaks);
    renderTasks();

    input.value = '';
});

// Renderizar tareas

function renderTasks() {
    tasklist.innerHTML = '';

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.textContent = task.text;

        if(task.completed) {
            li.classList.add('completed');
        }

        tasklist.appendChild(li);
    });
}