import { type } from "os";
import React, { FC, useState } from "react";
import FileIcon from "../../../assets/icon/FileIcon";
import FolderIcon from "../../../assets/icon/FolderIcon";
import ContextMenu from "../../UI/Context-Menu";
import { ContextMenuItems } from "./Context-menu-items";
import styles from "./styles.module.css";

interface TreeItemProps {
  id: string;
  name: string;
  isFolder?: boolean;
  isSelected: boolean;
  isDefaultOpen?: boolean;
  children?: React.ReactNode;
  onClick?: any;
  onCreateNewFolder: any;
}

const TreeItem: FC<TreeItemProps> = ({
  id,
  name,
  isDefaultOpen = false,
  children,
  isFolder = true,
  isSelected,
  onClick,
  onCreateNewFolder,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const onTreeItemClickHandler = (id: string) => {
    setIsOpen(!isOpen);
    onClick && onClick(id);
  };

  const menuItems = [
    {
      id: 0,
      name: "New Folder",
      onClick: onCreateNewFolder,
    },
    {
      id: 1,
      name: "New File",
      onClick: () => {},
    },
    {
      id: 2,
      name: "Rename",
      onClick: () => {},
    },
    {
      id: 3,
      name: "Delete",
      onClick: () => {},
    },
  ];

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
      <ContextMenu
        shouldShow={isSelected}
        menu={<ContextMenuItems menuItems={menuItems} />}
      />
      {isOpen && <div className={styles.children}>{children}</div>}
    </ul>
  );
};

export default TreeItem;
