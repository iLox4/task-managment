import { useContext } from "react";
import { ModeContext } from "../../../store/mode-context";

import styles from "./ModeButton.module.css";

export default function ModeButton({label}: {label: string}) {
  const { toggleMode } = useContext(ModeContext);

  return (
    <button onClick={toggleMode} className={styles.modeButton}>
      {label}
    </button>
  );
}
