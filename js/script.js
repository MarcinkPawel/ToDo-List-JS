{
    const tasks = [];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneButtons = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="list__button list__button--done js-done">
                 ${task.done ? "&#10004" : ""} </button> 
                <span class="${task.done ? "list__taskDone" : ""}">${task.content}</span> 
                <button class="list__button list__button--delete js-remove">&#128465</button>
            </li>
            `;
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;

        bindRemoveEvents();
        bindToggleDoneButtons();

    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-enterTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const showNewTask = document.querySelector(".js-newTask");
        showNewTask.addEventListener("submit", onSubmit);

    };

    init();
}