import { useState, useContext, ReactElement } from "react";
import { TaskContext } from "../../store/task-context";
import { CategoryContext } from "../../store/category-context";

import styles from "./TaskForm.module.css";
import Modal from "../ui/modal/Modal";

export type InputType = { title: string; deadline: string; categoryId: string };
import { Task } from "../../store/task-context";

export default function TaskForm({
  task,
  closeModal,
}: {
  task: Task | null;
  closeModal: () => void;
}) {
  const { categories } = useContext(CategoryContext);

  const [inputState, setInput] = useState<InputType>({
    title: task ? task.title : "",
    deadline: task ? task.deadline : "",
    categoryId: task ? task.categoryId : "",
  });

  const { addTask, updateTask } = useContext(TaskContext);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();

    if (!task) {
      addTask(inputState);
    } else {
      updateTask({ ...task, ...inputState });
    }

    closeModal();
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e): void => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const options: ReactElement[] = [];

  if (!task) {
    options.push(
      <option value="" key="initial">
        select category
      </option>
    );
  }

  categories.forEach((category) => {
    options.push(
      <option value={category.id} key={category.id}>
        {category.category}
      </option>
    );
  });

  return (
    <Modal>
      <h2 className={styles.formHeader}>{task ? "Update task" : "Add new task"}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="title">title</label>
          <input
            className={styles.input}
            type="text"
            required
            name="title"
            id="title"
            onChange={handleChange}
            value={inputState.title}
          ></input>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="deadline">deadline</label>
          <input
            className={styles.input}
            type="date"
            required
            name="deadline"
            id="deadline"
            onChange={handleChange}
            value={inputState.deadline}
          ></input>
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="categoryId">category</label>
          <select
            className={styles.input}
            name="categoryId"
            required
            id="categoryId"
            onChange={handleChange}
            value={inputState.categoryId}
          >
            {options}
          </select>
        </div>
        <div className={styles.actionsWrapper}>
          <button className={styles.button} onClick={closeModal} type="reset">
            cancel
          </button>
          <button className={styles.button} type="submit">
            {task ? "update" : "add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
