class TaskUtils {
    /**
     * Adds a task to the list.
     * 
     * This method retrieves the task from the input field, sends it to the Python backend to add it to the task list,
     * and updates the HTML list with the new task.
     */
    static addTask() {
        let taskInput = document.getElementById('taskInput');
        let task = taskInput.value;
        eel.AddTask(task)(function(newTask) {
            if (newTask) {
                let taskList = document.getElementById('taskList');
                let li = document.createElement('li');
                li.textContent = newTask;
                let button = document.createElement('button');
                button.textContent = 'Delete';
                button.onclick = function() {
                    eel.DeleteTask(newTask)(function() {
                        li.remove();
                    });
                };
                li.appendChild(button);
                taskList.appendChild(li);
                taskInput.value = '';
            }
        });
    }
    
    /**
     * Loads tasks from the backend and displays them in the HTML list.
     * 
     * This method retrieves the list of tasks from the Python backend and populates the HTML list with these tasks,
     * adding delete buttons to each task.
     */
    static loadTasks() {
        eel.GetTasks()(function(tasks) {
            let taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            for (let task of tasks) {
                let li = document.createElement('li');
                li.textContent = task;
                let button = document.createElement('button');
                button.textContent = 'Delete';
                button.onclick = function() {
                    eel.DeleteTask(task)(function() {
                        li.remove();
                    });
                };
                li.appendChild(button);
                taskList.appendChild(li);
            }
        });
    }
}

/**
 * Event listener to load tasks when the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', TaskUtils.loadTasks);
