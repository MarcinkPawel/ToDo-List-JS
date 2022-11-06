{
    let tasks = [];
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks,
        { content: newTaskContent }
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

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

    const renderTask = () => {
        const htmlString = task => `
            <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""} js-listItem">

                <button class="list__button list__button--done js-done">
                 ${task.done ? "&#10004" : ""} </button> 
                <span class="${task.done ? "list__taskDone" : ""}">${task.content}</span> 
                <button class="list__button list__button--delete js-remove">&#128465</button>
            </li>
            `;
        const listElement = document.querySelector(".js-taskList");
        listElement.innerHTML = tasks.map(htmlString).join("");
    };


    const renderButtons = () => {
        const buttonElement = document.querySelector(".js-taskButtons");

        if (!tasks.length) {
            buttonElement.innerHTML = "";
            return;
        }

        buttonElement.innerHTML = `
        <button class="section__button  js-hideTask">
         ${hideDoneTasks ? "Show" : "Hide"} done 
         </button>
        <button class="section__button  js-complete" 
        ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >Complete all
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const setAllDone = document.querySelector(".js-complete");

        if (setAllDone) {
            setAllDone.addEventListener("click", markAllTasksDone);
        }


        const toggleHideTasksButton = document.querySelector(".js-hideTask");
        if (toggleHideTasksButton) {
            toggleHideTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTask();
        bindToggleDoneButtons();
        bindRemoveEvents();
        renderButtons();
        bindButtonsEvents();
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