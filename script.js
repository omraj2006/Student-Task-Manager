
const taskForm = document.getElementById("taskForm");
const priority = document.getElementById("priority");
const taskTitle = document.getElementById("taskTitle");
const subject = document.getElementById("subject");
const description = document.getElementById("description");

const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");


let tasks = [];


// Add new task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const task = {
    id: Date.now(),
    title: taskTitle.value,
    subject: subject.value,
    description: description.value,
    priority: priority.value,
    completed: false
    };


    tasks.push(task);

    displayTasks();

    taskForm.reset();
});


// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.appendChild(emptyMessage);

        taskCount.textContent = 0;

        return;
    }


    taskCount.textContent = tasks.length;


    tasks.forEach(function(task) {

        const taskCard = document.createElement("div");

        taskCard.classList.add("task-card");


        if (task.completed) {
            taskCard.classList.add("completed");
        }


        taskCard.innerHTML = `

            <h3>${task.title}</h3>

            <p class="subject">
                Subject: ${task.subject}
            </p>

            <p class="priority">
                Priority: ${task.priority}
            </p>

            <p class="description">
                ${task.description || "No description provided."}
            </p>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="completeTask(${task.id})"
                >
                    ${task.completed ? "Completed" : "Mark Complete"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    Delete
                </button>

            </div>
        `;


        taskList.appendChild(taskCard);

    });
}


// Mark task as completed
function completeTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;
        }

        return task;
    });


    displayTasks();
}


// Delete task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });


    displayTasks();
}


// Initial display
displayTasks();