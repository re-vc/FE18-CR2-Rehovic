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

const container = document.querySelector('#main');
let tasks = [];

function createTaskEmpty(amount) {
    for (let i = 0; i < amount; i++) {
        let name = 'task_' + i;
        name = new Task(i);
        tasks.push(name);
    }
}

function determinePriorityColor(i) {
    let current = tasks[i].priority;
    let setColor;
    switch (true) {
        case (current >= 4):
            setColor = 'danger';
            break;
        case (current >= 2):
            setColor = 'warning';
            break;
        case (current >= 0):
            setColor = 'success';
            break;
        default:
            setColor = '';
            break;
    }
    return setColor;
}

function printTask() {
    for (let i = 0; i < tasks.length; i++) {
        const card = document.createElement("div");
        card.className = "card col-sm-12 col-md-6 col-xl-4";
        card.innerHTML =
            `<div class="card-body">
                <div class="wrapperUI">
                    <div class="task">Task ${'#' + i}</div>
                    <div>
                        <i class="bi bi-bookmark"></i>
                        <i class="bi bi-three-dots-vertical"></i>
                    </div>
                </div>
                <img src="img/Screenshot_01.png" alt="table with notepad and macbook">
                <h4 class="card-title">${tasks[i].title}</h4>
                <p class="card-text">${tasks[i].description}</p>
                <div class="wrapperInfo">
                    <div class="wrapperPriority">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                        <h5>Priority level: </h5>
                        <button class="priority ${determinePriorityColor(i)}">${tasks[i].priority}</button>
                    </div>
                    <div class="wrapperDeadline">
                        <i class="bi bi-calendar-event"></i>
                        <h5>Deadline: </h5>
                        <h5>${tasks[i].deadline}</h5>
                    </div>
                </div>
                <div class="wrapperControls">
                    <button class="btn btn-danger delete"><i class="bi bi-trash"></i> Delete</button>                
                    <button class="btn btn-success done"><i class="bi bi-check2-circle"></i> Done</button>
                </div>
            </div>`;

        container.appendChild(card);

        const deleteBtn = card.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            card.remove();
            tasks.splice(i, 1);
            localStorage.setItem('myTasksJSON', JSON.stringify(tasks));
        });

        const doneBtn = card.querySelector(".done");
        doneBtn.addEventListener("click", () => {
            card.classList.add('successTask')
        });

        const modifyPriority = card.querySelector(".priority");
        modifyPriority.addEventListener("click", () => {
            let current = parseInt(modifyPriority.textContent);
            if (tasks[i].priority === undefined) {
                current = 0;
            } else {
                current++;
            }
            modifyPriority.textContent = current;
            tasks[i].priority = current;
            modifyPriority.classList.remove("danger", "warning", "success");
            modifyPriority.classList.add(determinePriorityColor(i));
            localStorage.setItem('myTasksJSON', JSON.stringify(tasks));
        });
    }
}

createTaskEmpty(5);
tasks[0].title = 'buy milk';
tasks[0].description = 'go and buy milk for cooking.';
tasks[0].priority = 1;
tasks[0].deadline = '22.02.2023';

tasks[1].title = 'cook pudding';
tasks[1].description = 'use the milk to create pudding for guests.';
tasks[1].priority = 2;
tasks[1].deadline = '28.02.2023';

tasks[2].title = 'dinner party';
tasks[2].description = 'guests are coming to enjoy the food.';
tasks[2].priority = 3;
tasks[2].deadline = '01.03.2023';

tasks[3].title = 'visit friend';
tasks[3].description = 'go and visit friend.';
tasks[3].priority = 5;
tasks[3].deadline = '26.02.2023';

const createTasksBTN = document.getElementById("createTasksBTN");
createTasksBTN.addEventListener("click", () => {
    const myInput = document.getElementById("myNumber").value;
    createTaskEmpty(myInput);
    printTask();
    document.getElementById("myNumber").value = "";
});

const subscribe = document.getElementById("subscribe");
const email = document.getElementById("email");
subscribe.addEventListener("click", () => { email.value = "" });

printTask();
localStorage.setItem('myTasksJSON', JSON.stringify(tasks));