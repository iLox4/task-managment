import { ReactElement, useState } from "react";

import styles from "./TaskList.module.css";

import UpArrow from "../../ui/icons/UpArrow";
import DownArrow from "../../ui/icons/DownArrow";

export default function TaskList({
  color,
  taskClass,
  children,
}: {
  color: string;
  taskClass: string;
  children: ReactElement[];
}) {
  const [isTasksVisible, setIsTasksVisible] = useState(false);

  const handleChangeTasksVisibility = (): void => {
    setIsTasksVisible((prevVisibility) => !prevVisibility);
  };

  const taskHeaderStyle = isTasksVisible
    ? `${styles.taskHeader} ${styles.tasksVisible}`
    : `${styles.taskHeader}`;

  return (
    <div>
      <div className={taskHeaderStyle} style={{ color, borderColor: color }}>
        <h2>{taskClass}</h2>
        <button className={styles.button} onClick={handleChangeTasksVisibility}>
          {isTasksVisible ? <UpArrow /> : <DownArrow />}
        </button>
      </div>
      {isTasksVisible && <ul className={styles.tasks}>{children}</ul>}
    </div>
  );
}
