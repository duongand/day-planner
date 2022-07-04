document.getElementById('task').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

document.getElementById('submit').addEventListener('click', appendTask);

const taskList = document.getElementById('to-do-list');
taskList.addEventListener('click', function (event) {
    const target = event.target;

    switch (target.className) {
        case 'incomplete':
            target.style.textDecoration = 'line-through';
            target.className = 'completed';
            break;
        case 'completed':
            target.style.removeProperty('text-decoration');
            target.className = 'incomplete';
            break;
        case 'remove':
            target.parentElement.remove();
            break;
        default:
            break;
    };
});

function appendTask() {
    const taskSubmission = document.getElementById('task');

    if (taskSubmission.value === '') return;

    const taskButton = document.createElement('button');
    taskButton.setAttribute('class', 'remove');
    taskButton.innerHTML = 'X';

    const taskListElement = document.createElement('li');
    taskListElement.setAttribute('class', taskSubmission.value);

    const task = document.createElement('button');
    task.setAttribute('class', 'incomplete');
    task.innerHTML = taskSubmission.value;

    taskListElement.appendChild(task);
    taskListElement.appendChild(taskButton);

    taskList.appendChild(taskListElement);

    clearInput();
};

function clearInput() {
    document.getElementById('task').value = '';
};