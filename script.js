document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    // Función para cargar tareas desde almacenamiento local
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(addTaskToDOM);
    }
    // Función para agregar tarea al DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete');
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }
    // Función para guardar tareas en local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Evento para agregar una nueva tarea
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTask = taskInput.value.trim();
        if (newTask) {
            addTaskToDOM(newTask);
            saveTasks();
            taskInput.value = '';
            // Mostrar alerta de éxito
            Swal.fire({
                icon: "success",
                title: "Tu tarea ha sido guardada",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
// Evento para eliminar una tarea
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // Mostrar alerta de confirmación
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, bórralo!",
            customClass: {
                popup: 'swal-center',
                actions: 'swal-actions-center' // Clase personalizada para los botones
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Elimina la tarea solo si el usuario confirma
                e.target.parentElement.remove();
                saveTasks();
                // Mostrar alerta de éxito
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "Tu archivo ha sido eliminado.",
                    icon: "success",
                    customClass: {
                        popup: 'swal-center',
                        actions: 'swal-actions-center' // Clase personalizada para los botones
                    }
                });
            }
        });
    }
});
    // Cargar tareas guardadas al inicio
    loadTasks();
});