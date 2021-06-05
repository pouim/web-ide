import React from "react";
import styles from "./styles.module.css";

export const ContextMenuItems = () => {
  return (
    <ul className={styles.ContextMenuItems}>
      <li>New Folder</li>
      <li>New File</li>
      <li>Rename</li>
      <li>Delete</li>
    </ul>
  );
};
