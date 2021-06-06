import React, { FC } from "react";
import styles from "./styles.module.css";



interface CodeEditorProps {
  code?: string;
  onSaveCode: any;
}

const CodeEditor: FC<CodeEditorProps> = ({ code, onSaveCode }) => {
  return (
    <div className={styles.wrapper}>
      <textarea
        onChange={onSaveCode}
        autoFocus
        className={styles.textarea}
        defaultValue={code || ""}
      />
    </div>
  );
};

export default CodeEditor;
