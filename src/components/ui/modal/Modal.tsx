import { ReactElement } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

export default function Modal({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  let modalDiv = document.getElementById("modal");
  if (!modalDiv) {
    modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "modal");
  }

  const modalContent = (
    <>
      <div className={styles.overlay} />
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(
    modalContent,
    modalDiv
  );
}
