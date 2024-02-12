import { useContext } from "react";
import { ModeContext } from "../../store/mode-context";
import { ModalFormContext } from "../../store/modal-form-context";

import ModeButton from "./mode-button/ModeButton";
import styles from "./MainHeader.module.css";

export default function MainHeader() {
  const modeCtx = useContext(ModeContext);
  const { openFormModal } = useContext(ModalFormContext);

  const title = modeCtx.mode === "all" ? "All tasks:" : "Today tasks:";

  return (
    <div className={styles.header}>
      <ModeButton label={title}/>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={() =>
            openFormModal({ type: "category", task: null, category: null })
          }
        >
          +category
        </button>
        <button
          className={styles.button}
          onClick={() =>
            openFormModal({ type: "task", task: null, category: null })
          }
        >
          +task
        </button>
      </div>
    </div>
  );
}
