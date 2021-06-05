import { type } from "os";
import React, { FC, useState } from "react";
import FileIcon from "../../../assets/icon/FileIcon";
import FolderIcon from "../../../assets/icon/FolderIcon";
import ContextMenu from "../../UI/Context-Menu";
import { ContextMenuItems } from "./Context-menu-items";
import styles from "./styles.module.css";

interface TreeItemProps {
  id: number;
  name: string;
  isFolder?: boolean;
  isSelected: boolean;
  isDefaultOpen?: boolean;
  children?: React.ReactNode;
  onClick?: any;
}

const TreeItem: FC<TreeItemProps> = ({
  id,
  name,
  isDefaultOpen = false,
  children,
  isFolder = true,
  isSelected,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const onTreeItemClickHandler = (id: number) => {
    setIsOpen(!isOpen)
    onClick && onClick(id);
  }


  

  return (
    <ul>
      <div
        key={id}
        onClick={() => onTreeItemClickHandler(id)}
        className={styles.wrapper}
      >
        {isFolder ? (
          <FolderIcon width={20} height={20} />
        ) : (
          <FileIcon width={20} height={20} color="#FEFEFE" />
        )}
        <span className={isSelected ? styles.active : ""}>{name}</span>
        {isFolder && (
          <span className={isOpen ? styles["rotate90"] : styles["arrow"]}>
            {">"}
          </span>
        )}
      </div>
      <ContextMenu shouldShow={isSelected} menu={<ContextMenuItems />} />
      {isOpen && <div className={styles.children}>{children}</div>}
    </ul>
  );
};

export default TreeItem;
