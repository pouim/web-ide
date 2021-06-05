import React from "react";
import styles from "./styles.module.css";

const CodeEditor = () => {
  return (
    <div className={styles.wrapper}>
      <textarea autoFocus className={styles.textarea} />
    </div>
  );
};

export default CodeEditor;
