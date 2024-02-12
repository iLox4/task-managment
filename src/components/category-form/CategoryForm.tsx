import { useState, useContext } from "react";
import { CategoryContext } from "../../store/category-context";

import styles from "./CategoryForm.module.css";
import { Category } from "../../store/category-context";

import Modal from "../ui/modal/Modal";

type InputType = {
  category: string;
  color: string;
};

export default function CategoryForm({
  category,
  closeModal,
}: {
  category: Category | null;
  closeModal: () => void;
}) {
  const [inputedCategory, setInputedCategory] = useState<InputType>({
    category: category ? category.category : "",
    color: category ? category.color : "#ffffff",
  });
  const { addCategory } = useContext(CategoryContext);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();

    addCategory(inputedCategory);

    closeModal();
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e): void => {
    setInputedCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal>
      <h2 className={styles.formHeader}>{category ? "Update category" : "Create category"}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="category">category</label>
          <input
            className={styles.input}
            value={inputedCategory.category}
            id="category"
            name="category"
            type="text"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="color">color</label>
          <input
            className={styles.input}
            value={inputedCategory.color}
            id="color"
            name="color"
            type="color"
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.actionsWrapper}>
          <button className={styles.button} type="reset" onClick={closeModal}>
            cancel
          </button>
          <button className={styles.button} type="submit">
            {category ? "update" : "add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
