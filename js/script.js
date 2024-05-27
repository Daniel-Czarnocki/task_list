{
    let tasks = [];
    let hideDoneTasks = false;

    const formFocus = () => {
        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.focus();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
        formFocus();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
        formFocus();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
        formFocus();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
        formFocus();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
        formFocus();
    };


    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        const taksToHTML = task => `
            <li class="tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-task">
                <button class="tasks__button tasks__button--toggleDone js-toggleDone">   
                    ${task.done ? "&#x2713;" : ""}
                </button>
                <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                    &#x1f5d1;
                </button>
           </li>
            `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taksToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.getElementById("headerButtons");
        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class = "buttons__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="buttons__button js-markAllDone"
            ${ tasks.every(({ done }) => done) ? "disabled" : ""}
            >
            Ukończ wszystkie
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        }

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents ();
        bindToggleDoneEvents ();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        formFocus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}







