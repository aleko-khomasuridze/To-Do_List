
# To-Do List Application

This project is a simple To-Do list application built using Python, Eel, HTML, CSS, and JavaScript. The application allows users to add, view, and delete tasks from a list.

## Features

- Add tasks to the list
- View all tasks
- Delete tasks from the list

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

2. Install the required Python libraries:

    - Run `setup.bat` this script willl get your device ready for running program 

## Usage

1. Navigate to the project directory.

2. Run the Python script:

   ```bash
   python main.py
   ```

3. The application window will open, displaying the To-Do list interface.

## Project Structure

```
todo-list-app/
│
├── main.py
├── web/
│   ├── index.html
│   ├── styles.css
│   ├── main.js
│   └── eel.js
└── README.md
```

### `main.py`

This is the main Python script that initializes the Eel application and defines the backend functions to add, retrieve, and delete tasks.

### `web/index.html`

This is the HTML file that defines the structure of the user interface.

### `web/styles.css`

This is the CSS file that styles the user interface.

### `web/main.js`

This is the JavaScript file that handles the frontend logic, including adding, loading, and deleting tasks.

## Code Explanation

### Backend (`main.py`)

```python
import eel

# Initialize the Eel application
eel.init('web')

tasks = []

@eel.expose
def add_task(task):
    if task:
        tasks.append(task)
        return task
    return None

@eel.expose
def get_tasks():
    return tasks

@eel.expose
def delete_task(task):
    if task in tasks:
        tasks.remove(task)
        return True
    return False

if __name__ == '__main__':
    eel.start('index.html', size=(400, 600))
```

### Frontend (`web/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>To-Do List</h1>
        <input type="text" id="taskInput" placeholder="Enter a new task">
        <button onclick="TaskUtils.addTask()">Add Task</button>
        <ul id="taskList"></ul>
    </div>
    <script src="eel.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

### Styles (`web/styles.css`)

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

#app {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

h1 {
    margin: 0 0 20px 0;
}

input {
    width: calc(100% - 22px);
    padding: 10px;
    margin-bottom: 10px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
}

li button:hover {
    background-color: #c82333;
}
```

### Frontend Logic (`web/main.js`)

```javascript
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
```

## How to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## Contact

For any inquiries, please contact aleko.khomasuridze@gmail.com.
