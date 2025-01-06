document.getElementById('inp-btn').addEventListener('click', () => {
    const inpText = document.getElementById('inp-field').value.trim();
    if (inpText.length === 0) {
        alert('Please Enter A Task');
    } else {
        const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        if (!taskList.some(task => task.task === inpText)) {
            taskList.push({ task: inpText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(taskList));
            addTaskToDOM(inpText, false);
        } else {
            alert('Task already exists');
        }
    }
    document.getElementById('inp-field').value = '';
});

document.addEventListener('DOMContentLoaded', () => {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.forEach(task => addTaskToDOM(task.task, task.completed));
});

function addTaskToDOM(task, completed) {
    const taskDiv = document.createElement('div');
    taskDiv.innerHTML = `
        <h4 class="task ${completed ? 'complete' : ''}">${task}</h4>
        <div>
            <i class="fa-regular fa-pen-to-square edit-btn"></i>
            <i class="fa-regular fa-trash-can"></i>
        </div>`;

    document.getElementById('to-do').appendChild(taskDiv);

    // delete task
    taskDiv.querySelector('.fa-trash-can').addEventListener('click', (event) => {
        let taskElement = event.target.closest('div').parentElement;
        removeTaskFromLocalStorage(taskElement.querySelector('.task').textContent);
        taskElement.remove();
    });

    // task done
    taskDiv.querySelector('.task').addEventListener('click', (event) => {
        event.target.classList.toggle('complete');
        toggleTaskCompletion(task);
    });

    // edit task
    taskDiv.querySelector('.edit-btn').addEventListener('click', (event) => {
        const taskElement = event.target.closest('div').previousElementSibling;
        const newTask = prompt("Edit your task:", taskElement.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            updateTaskInLocalStorage(taskElement.textContent, newTask.trim());
            taskElement.textContent = newTask.trim();
        }
    });
}

function removeTaskFromLocalStorage(task) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList = taskList.filter(t => t.task !== task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function toggleTaskCompletion(task) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList = taskList.map(t => {
        if (t.task === task) {
            t.completed = !t.completed;
        }
        return t;
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function updateTaskInLocalStorage(oldTask, newTask) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList = taskList.map(t => {
        if (t.task === oldTask) {
            t.task = newTask;
        }
        return t;
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Filter tasks
document.getElementById('filter-all').addEventListener('click', () => filterTasks());
document.getElementById('filter-complete').addEventListener('click', () => filterTasks(true));
document.getElementById('filter-incomplete').addEventListener('click', () => filterTasks(false));

function filterTasks(completed = null) {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = taskList.filter(t => completed === null || t.completed === completed);
    document.getElementById('to-do').innerHTML = '<h3>to do list</h3>';
    filteredTasks.forEach(task => addTaskToDOM(task.task, task.completed));
}