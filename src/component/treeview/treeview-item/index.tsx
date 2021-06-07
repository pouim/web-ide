import { type } from "os";
import React, { FC, useState } from "react";
import FileIcon from "../../../assets/icon/FileIcon";
import FolderIcon from "../../../assets/icon/FolderIcon";
import { TreeData } from "../../../interface";
import ContextMenu from "../../UI/Context-Menu";
import { ContextMenuItems } from "./Context-menu-items";
import styles from "./styles.module.css";

interface TreeItemProps {
  item: TreeData;
  isFolder?: boolean;
  isSelected: boolean;
  isDefaultOpen?: boolean;
  children?: React.ReactNode;
  onClick?: any;
  onCreateNewFolder: any;
  onCreateNewFile: any;
  onRenameStarted: any;
  onDelete: any;
  onRenameDone: any;
  isEditMode: boolean;
}

const TreeItem: FC<TreeItemProps> = ({
  item,
  isDefaultOpen = false,
  children,
  isFolder = true,
  isSelected,
  onClick,
  onCreateNewFolder,
  onCreateNewFile,
  onRenameStarted,
  onRenameDone,
  onDelete,
  isEditMode,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const onTreeItemClickHandler = (item: TreeData) => {
    setIsOpen(!isOpen);
    onClick && onClick(item);
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
      onClick: onCreateNewFile,
    },
    {
      id: 2,
      name: "Rename",
      onClick: onRenameStarted,
    },
    {
      id: 3,
      name: "Delete",
      onClick: onDelete,
    },
  ];

  return (
    <ul>
      <div
        key={item.id}
        onDoubleClick={onRenameStarted}
        onClick={() => onTreeItemClickHandler(item)}
        className={styles.wrapper}
      >
        {isFolder ? (
          <FolderIcon width={20} height={20} />
        ) : (
          <FileIcon width={20} height={20} color="#FEFEFE" />
        )}
        {isEditMode && isSelected ? (
          <input
            placeholder="new name ... "
            onKeyDown={onRenameDone}
            autoFocus
            className={styles.editInput}
            type="text"
          />
        ) : (
          <span className={isSelected ? styles.active : ""}>{item.name}</span>
        )}
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
