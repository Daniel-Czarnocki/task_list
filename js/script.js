{
    let tasks = [];
    let hideDoneTasks = false;

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

    const markAllTasksAsDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
        formFocus();
    };

    const formFocus = () => {
        const newTaskInput = document.querySelector(".js-newTask");
        newTaskInput.focus();
    };

    

    

    const toggleHidingDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
        formFocus();
    };

    

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);

            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);

            });
        });
    };

    const renderTasksList = () => {
        const htmlString = task => `
            <li
                class="tasksList__item${task.done && hideDoneTasks ? " tasksList__item--hidden" : ""} js-task"
            >
                <button class="tasksList__button tasksList__button--done js-toggleDone">   
                    ${task.done ? "&#x2713;" : ""}
                </button>
                <span class="tasksList__wording${task.done ? " tasksList__wording--done" : ""}">
                    ${task.content}
                </span>
                <button class="tasksList__button tasksList__button--remove js-remove">
                    &#x1f5d1;
                </button>
                
            </li>
            `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(htmlString).join("");
    };

    //document.querySelector(".js-tasks").innerHTML = htmlString;



const renderButtons = () => {
    const buttonsElement = document.querySelector("js-buttons");

    if (!tasks.length) {
        buttonsElement.innerHTML = "";
        return;
    }

    buttonsElement.innerHTML = `
    <button class = "buttons__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button
            class="buttons__button js-markAllDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
            Ukończ wszystkie
        </button>
    `;
};

const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) { //(typeof markAllDoneButton !== "undefined")  
        markAllDoneButton.addEventListener("click", markAllTasksAsDone);
    }

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

    if (toggleHideDoneTasksButton) {
        toggleHideDoneTasksButton.addEventListener("click", toggleHidingDoneTasks);
    }

};

const render = () => {
    renderTasksList();
    bindEvents();
    
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







