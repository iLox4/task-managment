import { ReactElement, createContext, useReducer } from "react";

import { DUMMY_TASKS } from "../dummy-data/dummy-tasks";
import { parseTasks } from "../helpers/parseTasks";
import {
  addTaskReducer,
  updateTaskReducer,
  deleteTaskReducer,
} from "./reducers/task-reducers";

/**TYPES */
export type Task = {
  id?: string;
  title: string;
  deadline: string;
  categoryId: string;
};
export type Tasks = {
  today: {
    [key: string]: Task[];
  };
  all: {
    [key: string]: Task[];
  };
};
type TasksContext = {
  tasks: Tasks;
  updateTask: (task: Task) => void;
  addTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

type Action = {
  type: string;
  payload: {
    task: Task;
  };
};
type ReducerFunction = (state: Tasks, action: Action) => Tasks;

type DispatchTypes = "TASK_ADD" | "TASK_UPDATE" | "TASK_DELETE";
/**TYPES */


/**REDUCER */
const taskListReducer = (state: Tasks, action: Action): Tasks => {
  if (action.type === "TASK_ADD") {
    return addTaskReducer(state, action.payload.task);
  }
  if (action.type === "TASK_UPDATE" && action.payload.task.id) {
    return updateTaskReducer(state, action.payload.task);
  }

  if (action.type === "TASK_DELETE" && action.payload.task.id) {
    return deleteTaskReducer(state, action.payload.task);
  }

  return state;
};
/**REDUCER */


/**CONTEXT */
export const TaskContext = createContext<TasksContext>({
  tasks: {
    today: {},
    all: {},
  },
  updateTask: () => {},
  addTask: () => {},
  deleteTask: () => {},
});

export default function TaskContextProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const initialTasks = parseTasks(DUMMY_TASKS);
  const [taskList, taskListDispatch] = useReducer<ReducerFunction, Tasks>(
    taskListReducer,
    initialTasks,
    (initialValue: Tasks) => initialValue
  );

  const handleDispatchTask = (type: DispatchTypes, task: Task): void => {
    taskListDispatch({
      type,
      payload: {
        task,
      },
    });
  };

  const ctxValue: TasksContext = {
    tasks: taskList,
    updateTask: (task: Task) => handleDispatchTask("TASK_UPDATE", task),
    addTask: (task: Task) => handleDispatchTask("TASK_ADD", task),
    deleteTask: (task: Task) => handleDispatchTask("TASK_DELETE", task),
  };

  return (
    <TaskContext.Provider value={ctxValue}>{children}</TaskContext.Provider>
  );
}
/**CONTEXT */
