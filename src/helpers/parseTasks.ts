import { Task, Tasks } from "../store/task-context";

export const parseTasks = (tasks: Task[]): Tasks => {
  const parsedTasks: Tasks = {
    today: {},
    all: {},
  };
  const today = new Date().toLocaleDateString();

  tasks.forEach((task) => {
    if (!parsedTasks.all[task.categoryId]) {
      parsedTasks.all[task.categoryId] = [];
    }
    parsedTasks.all[task.categoryId].push(task);

    if (task.deadline === today) {
      if (!parsedTasks.today[task.categoryId]) {
        parsedTasks.today[task.categoryId] = [];
      }
      parsedTasks.today[task.categoryId].push(task);
    }
  })

  return parsedTasks
};
