let tasks = [];
let completedTasks = [];

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
        const task = {
            text: taskText,
            date: new Date().toLocaleString(),
            completed: false
        };

        tasks.push(task);
        updateTaskLists();
        newTaskInput.value = '';
    }
}

function completeTask(index) {
    tasks[index].completed = true;
    completedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    updateTaskLists();
}

function deleteTask(list, index) {
    list === 'pending' ? tasks.splice(index, 1) : completedTasks.splice(index, 1);
    updateTaskLists();
}

function updateTaskLists() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-list');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${task.text} (${task.date})
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="deleteTask('pending', ${index})">Delete</button>
        `;
        pendingTasksList.appendChild(listItem);
    });

    completedTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${task.text} (Completed on: ${task.date})
            <button onclick="deleteTask('completed', ${index})">Delete</button>
        `;
        completedTasksList.appendChild(listItem);
    });
}

// Initial update to display any existing tasks
updateTaskLists();
