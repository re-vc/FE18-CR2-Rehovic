class Task {
    id;
    title;
    description;
    priority;
    deadline;

    constructor(id, title, description, priority, deadline) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.deadline = deadline;
    }
}

const container = document.querySelector('.row.row-cols-3');
let tasks = [];

function createTaskEmpty(amount) {
    for (let i = 0; i < amount; i++) {
        let name = 'task_' + i;
        name = new Task(i);
        tasks.push(name);
    }
}

function printTask() {
    let row = document.getElementsByClassName('row');
    // let counter = -1;
    for (let i = 0; i < tasks.length; i++) {
        if (i % 3 == 0) {
            // container.innerHTML += `<div class="row"></div>`;
            // counter++;
        }
        // row[counter].innerHTML +=
        container.innerHTML +=
        `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Task${i}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`;
    }
}

createTaskEmpty(10);
printTask();

// localStorage.clear();
localStorage.setItem('myTasksJSON', JSON.stringify(tasks));