import eel
from src.TaskController import TaskController


eel.init('web')

taskController: TaskController = TaskController()

eel.expose(taskController.AddTask)
eel.expose(taskController.GetTasks)
eel.expose(taskController.DeleteTask)

if __name__ == '__main__':
    eel.start('index.html', size=(600, 600), port=8083)
