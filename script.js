let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.textContent = `${task.text} (${task.priority})`;
        if (task.completed) {
            taskText.classList.add("completed");
        }

        taskText.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    document.getElementById("taskCount").textContent =
        "Total Tasks: " + tasks.length;
}

function addTask() {
    let input = document.getElementById("taskInput");
    let priority = document.getElementById("priority").value;

    if (input.value === "") {
        alert("Enter a task!");
        return;
    }

    tasks.push({
        text: input.value,
        priority: priority,
        completed: false
    });

    input.value = "";
    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();