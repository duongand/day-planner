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
            window.localStorage.setItem(target.innerText, 'completed');
            break;
        case 'completed':
            target.className = 'incomplete';
            window.localStorage.setItem(target.innerText, 'incomplete');
            break;
        case 'remove':
            target.parentElement.remove();
            window.localStorage.removeItem(target.previousSibling.innerText);
            break;
        default:
            break;
    };
});

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

    window.localStorage.setItem(taskSubmission, status);
};

function appendTask() {
    const taskSubmission = document.getElementById('task').value;

    if (taskSubmission === '') return;

    createTaskElement(taskSubmission, 'incomplete');
    document.getElementById('task').value = '';
};

if (window.localStorage.length > 0) {
    for (let i = 0; i < window.localStorage.length; i++) {
        let taskKey = window.localStorage.key(i);
        createTaskElement(taskKey, window.localStorage.getItem(taskKey));
    };
};