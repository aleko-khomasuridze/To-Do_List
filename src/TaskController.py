class TaskController:
    """
    A class to manage a list of tasks.

    This class provides methods to add, retrieve, and delete tasks
    from a list of tasks.
    """

    def __init__(self) -> None:
        """
        Initializes a new instance of the TaskController class.

        This constructor initializes the list of tasks to an empty list.
        """
        self.__tasks = []

    def AddTask(self, task):
        """
        Adds a task to the list of tasks.

        Args:
            task (str): The task to add to the list.

        Returns:
            str: The task that was added, or None if the task is empty.

        This method appends the provided task to the list of tasks if
        it is not empty. If the task is empty, it returns None.
        """
        if task:
            self.__tasks.append(task)
            return task
        return None

    def GetTasks(self):
        """
        Retrieves the list of tasks.

        Returns:
            list: The list of tasks.

        This method returns the current list of tasks.
        """
        return self.__tasks

    def DeleteTask(self, task):
        """
        Deletes a task from the list of tasks.

        Args:
            task (str): The task to delete from the list.

        Returns:
            bool: True if the task was successfully deleted, False otherwise.

        This method removes the provided task from the list of tasks
        if it exists in the list. If the task is not found in the list,
        it returns False.
        """
        if task in self.__tasks:
            self.__tasks.remove(task)
            return True
        return False
