const to_do_submission = document.getElementById('submit');
to_do_submission.addEventListener('click', append_task);

let task_list = document.getElementById('to-do-list');
task_list.addEventListener('click', function(event) {
    // Uses the DOM Event Delegation to apply event listener to new list elements
    const target = event.target;

    // Check the current state of the added task item
    if (target.className === 'incomplete') {
        target.style.textDecoration = 'line-through';
        target.className = 'completed';
    } else if (target.className === 'completed') {
        target.style.removeProperty('text-decoration');
        target.className = 'incomplete';
    } else if (target.className === 'remove') {
        target.parentElement.remove();
    };
    

});

function append_task() {

    // Pull value from input field
    let task_submission = document.getElementById('task');
    let task_list = document.getElementById('to-do-list');

    // Create button element
    let task_button = document.createElement('button');
    task_button.setAttribute('class', 'remove');
    task_button.innerHTML = 'X';
    
    // Create list element
    let task_li = document.createElement('li');
    task_li.setAttribute('class', task_submission.value);
    
    // Create <a> element
    let task = document.createElement('button');
    task.setAttribute('class', 'incomplete');
    task.innerHTML = task_submission.value;

    task_li.appendChild(task);
    task_li.appendChild(task_button);

    // Append to end of task list
    task_list.appendChild(task_li);

    clear_input();
    task_delete_buttons = document.querySelectorAll('.submitted-task');

};

// Clears form field after new task has been added
function clear_input() {

    let input_field = document.getElementById('task');
    input_field.value = '';

}