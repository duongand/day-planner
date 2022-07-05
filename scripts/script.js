document.getElementById('task').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

document.getElementById('submit').addEventListener('click', appendTask);

const taskList = document.getElementById('to-do-list');
taskList.addEventListener('click', (event) => {
    const target = event.target;

    switch (target.className) {
        case 'incomplete':
            target.className = 'completed';
            updateTask(target.innerText, 'completed');
            break;
        case 'completed':
            target.className = 'incomplete';
            updateTask(target.innerText, 'incomplete');
            break;
        case 'remove':
            target.parentElement.remove();
            updateTask(target.previousSibling.innerText, 'remove');
            break;
        default:
            break;
    };
});

let storedTasks = [];
function createTaskElement(taskSubmission, status) {
    const taskButton = document.createElement('button');
    taskButton.setAttribute('class', 'remove');
    taskButton.innerHTML = 'X';

    const taskListElement = document.createElement('li');
    taskListElement.setAttribute('class', taskSubmission);

    const task = document.createElement('button');
    task.setAttribute('class', status);
    task.innerHTML = taskSubmission;

    taskListElement.appendChild(task);
    taskListElement.appendChild(taskButton);
    taskList.appendChild(taskListElement);

    tempMap = {'task': taskSubmission, 'status': status};

    storedTasks.push(tempMap);
    window.localStorage.setItem('to-dos', JSON.stringify(storedTasks));
};

function appendTask() {
    const taskSubmission = document.getElementById('task').value;

    if (taskSubmission === '') return;

    createTaskElement(taskSubmission, 'incomplete');
    document.getElementById('task').value = '';
};

function updateTask(passedTask, newStatus) {
    let index;
    for (let i = 0; i < storedTasks.length; i++) {
        if (storedTasks[i].task === passedTask) {
            index = i;
        };
    };

    if (newStatus === 'remove') {
        storedTasks.splice(index, 1);
    } else {
        storedTasks[index].status = newStatus;
    };

    window.localStorage.setItem('to-dos', JSON.stringify(storedTasks));
};

if (window.localStorage.length > 0) {
    const taskArray = JSON.parse(window.localStorage.getItem('to-dos'));

    for (let i = 0; i < taskArray.length; i++) {
        createTaskElement(taskArray[i].task, taskArray[i].status);
    };
};