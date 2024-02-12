import { ReactElement, useContext, memo } from "react";

import { TaskContext } from "../../store/task-context";
import { ModeContext } from "../../store/mode-context";
import { CategoryContext } from "../../store/category-context";

import styles from "./Tasks.module.css";

import TaskList from "./task-list/TaskList";
import TaskItem from "./task-item/TaskItem";

const Tasks = memo(function Tasks() {
  const { tasks, deleteTask } = useContext(TaskContext);
  const { mode } = useContext(ModeContext);
  const { getCategoryById } = useContext(CategoryContext);

  const tasksToUse = mode === "all" ? tasks.all : tasks.today;

  const content: ReactElement[] = [];

  for (const categoryId in tasksToUse) {
    const { color, id, category } = getCategoryById(categoryId);
    content.push(
      <TaskList taskClass={category} key={id} color={color}>
        {tasksToUse[categoryId].map((task) => (
          <TaskItem
            key={task.id}
            color={color}
            task={task}
            onDelete={() => deleteTask(task)}
          />
        ))}
      </TaskList>
    );
  }

  return <div className={styles.tasks}>{content}</div>;
});

export default Tasks;
