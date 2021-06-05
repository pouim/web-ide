import { type } from "os";
import React, { FC, useState } from "react";
import FileIcon from "../../../assets/icon/FileIcon";
import FolderIcon from "../../../assets/icon/FolderIcon";
import styles from "./styles.module.css";

interface TreeItemProps {
  name: string;
  isFolder?: boolean;
  isDefaultOpen?: boolean;
  children?: React.ReactNode;
}

const TreeItem: FC<TreeItemProps> = ({
  name,
  isDefaultOpen = false,
  children,
  isFolder = true,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.wrapper}>
        {isFolder ? (
          <FolderIcon width={20} height={20} />
        ) : (
          <FileIcon width={20} height={20} color="#FEFEFE" />
        )}
        <span className={isOpen ? styles.active : ""}>{name}</span>
        {isFolder && (
          <span className={isOpen ? styles["rotate90"] : styles["arrow"]}>
            {">"}
          </span>
        )}
      </div>
      {isOpen && <div className={styles.children}>{children}</div>}
    </>
  );
};

export default TreeItem;
