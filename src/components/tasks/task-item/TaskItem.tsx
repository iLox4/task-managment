import { useContext } from "react";
import { ModalFormContext } from "../../../store/modal-form-context";

import styles from "./TaskItem.module.css";

import { Task } from "../../../store/task-context";

export default function TaskItem({
  color,
  task,
  onDelete,
}: {
  color: string;
  task: Task;
  onDelete: () => void;
}) {
  const { openFormModal } = useContext(ModalFormContext);
  const { title, deadline } = task;
  const deadlineDate = new Date(deadline).toLocaleDateString();

  const backgroundColor = color + "20";

  return (
    <div className={styles.task} style={{ backgroundColor }}>
      <h4 onClick={onDelete}>{title}</h4>
      <div className={styles.taskInfo}>
        <p>Deadline - {deadlineDate}</p>
        <button
          className={styles.button}
          onClick={() => openFormModal({ type: "task", task, category: null })}
        >
          edit
        </button>
      </div>
    </div>
  );
}
