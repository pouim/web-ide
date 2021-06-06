import React, { FC, useState } from "react";
import { TreeData } from "../../interface";
import styles from "./styles.module.css";
import TreeItem from "./treeview-item";

interface TreeViewProps {
  data: TreeData[];
  onTreeItemClick?: any;
  onCreateNewFolder: any;
  onCreateNewFile: any;
  onRenameStarted: any;
  onRenameDone: any;
  onDelete: any;
  isEditMode: boolean;
  selectedItem: TreeData | null;
}

const TreeView: FC<TreeViewProps> = ({
  data,
  onTreeItemClick,
  onCreateNewFolder,
  onCreateNewFile,
  selectedItem,
  onRenameStarted,
  onRenameDone,
  onDelete,
  isEditMode,
}) => {
 

  /**
   * define selected item
   * @param id
   * @returns
   */
  const isSelectedItem = (id: string) => id === selectedItem?.id;

  /**
   * render child tree items
   * @param items
   * @returns
   */
  const renderChildTreeItems = (items: TreeData[]) => {
    return items.map((item: TreeData) => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeItem
            item={item}
            onClick={onTreeItemClick}
            onCreateNewFolder={onCreateNewFolder}
            onCreateNewFile={onCreateNewFile}
            onRenameStarted={onRenameStarted}
            onRenameDone={onRenameDone}
            onDelete={onDelete}
            isEditMode={isEditMode}
            isDefaultOpen={item.isOpen}
            isFolder={item.isFolder}
            isSelected={isSelectedItem(item.id)}
          >
            {renderChildTreeItems(item.children)}
          </TreeItem>
        );
      } else {
        return (
          <TreeItem
            item={item}
            onClick={onTreeItemClick}
            onCreateNewFolder={onCreateNewFolder}
            onCreateNewFile={onCreateNewFile}
            onRenameStarted={onRenameStarted}
            onRenameDone={onRenameDone}
            onDelete={onDelete}
            isEditMode={isEditMode}
            isDefaultOpen={item.isOpen}
            isFolder={item.isFolder}
            isSelected={isSelectedItem(item.id)}
          ></TreeItem>
        );
      }
    });
  };

  /**
   * redder sun tree items
   * @param items
   * @returns
   */

  const renderSubTreeItems = (items: TreeData[]) => {
    const TreeNode = items.map((item: TreeData) => {
      if (item.parent === null) {
        if (item.children && item.children.length > 0) {
          return (
            <TreeItem
              item={item}
              onClick={onTreeItemClick}
              onCreateNewFolder={onCreateNewFolder}
              onCreateNewFile={onCreateNewFile}
              onRenameStarted={onRenameStarted}
              onRenameDone={onRenameDone}
              onDelete={onDelete}
              isEditMode={isEditMode}
              isDefaultOpen={item.isOpen}
              isFolder={item.isFolder}
              isSelected={isSelectedItem(item.id)}
            >
              {renderChildTreeItems(item.children)}
            </TreeItem>
          );
        } else {
          return (
            <TreeItem
              item={item}
              onClick={onTreeItemClick}
              onCreateNewFolder={onCreateNewFolder}
              onCreateNewFile={onCreateNewFile}
              onRenameDone={onRenameDone}
              onRenameStarted={onRenameStarted}
              onDelete={onDelete}
              isEditMode={isEditMode}
              isDefaultOpen={item.isOpen}
              isFolder={item.isFolder}
              isSelected={isSelectedItem(item.id)}
            ></TreeItem>
          );
        }
      }
    });

    return TreeNode;
  };

  return <div className={styles["wrapper"]}>{renderSubTreeItems(data)}</div>;
};

export default TreeView;
