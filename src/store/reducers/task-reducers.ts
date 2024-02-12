import { Tasks, Task } from "../task-context";

type TaskCategories = {
  [key: string]: Task[];
};

export const addTaskReducer = (state: Tasks, task: Task): Tasks => {
  const newTodayTasks: TaskCategories = {};
  for (const key in state.today) {
    newTodayTasks[key] = [...state.today[key]];
  }

  const newAllTasks: TaskCategories = {};
  for (const key in state.all) {
    newAllTasks[key] = [...state.all[key]];
  }

  const today = new Date().toISOString().slice(0,10);
  const id = String(Math.round(Math.random() * 100));
  const newTask = { ...task, id };

  if (today === task.deadline) {
    if (!newTodayTasks[task.categoryId]) {
      newTodayTasks[task.categoryId] = [];
    }
    newTodayTasks[task.categoryId].push(newTask);
  }

  if (!newAllTasks[task.categoryId]) {
    newAllTasks[task.categoryId] = [];
  }
  newAllTasks[task.categoryId].push(newTask);

  return {
    today: newTodayTasks,
    all: newAllTasks,
  };
};

export const updateTaskReducer = (state: Tasks, task: Task): Tasks => {
  const newTodayTasks: TaskCategories = {};
  for (const key in state.today) {
    newTodayTasks[key] = [...state.today[key]];
  }

  const newAllTasks: TaskCategories = {};
  for (const key in state.all) {
    newAllTasks[key] = [...state.all[key]];
  }

  const today = new Date().toISOString().slice(0,10);

  if (today === task.deadline) {
    if (!newTodayTasks[task.categoryId]) {
      newTodayTasks[task.categoryId] = [task];
    } else {
      const idx = newTodayTasks[task.categoryId].findIndex(
        (el: Task) => el.id === task.id
      );
      newTodayTasks[task.categoryId][idx] = task;
    }
  }

  if (!newAllTasks[task.categoryId]) {
    newAllTasks[task.categoryId] = [task];
  } else {
    const idx = newAllTasks[task.categoryId].findIndex(
      (el: Task) => el.id === task.id
    );
    newAllTasks[task.categoryId][idx] = task;
  }

  return {
    today: newTodayTasks,
    all: newAllTasks,
  };
};

export const deleteTaskReducer = (state: Tasks, task: Task): Tasks => {
  const newTodayTasks: TaskCategories = {};
  for (const key in state.today) {
    newTodayTasks[key] = [...state.today[key]];
  }

  const newAllTasks: TaskCategories = {};
  for (const key in state.all) {
    newAllTasks[key] = [...state.all[key]];
  }

  const today = new Date().toISOString().slice(0,10);

  if (today === task.deadline) {
    newTodayTasks[task.categoryId] = state.today[task.categoryId].filter(
      (el: Task) => el.id !== task.id
    );
  }
  newAllTasks[task.categoryId] = state.all[task.categoryId].filter(
    (el: Task) => el.id !== task.id
  );

  return {
    today: newTodayTasks,
    all: newAllTasks,
  };
};
