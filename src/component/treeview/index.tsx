import React, { FC } from "react";
import { TreeData } from "../../interface";
import styles from "./styles.module.css";
import TreeItem from "./treeview-item";

interface TreeViewProps {
  data: TreeData[];
  onTreeItemClick?: any;
  selectedID: number | null;
}

const TreeView: FC<TreeViewProps> = ({ data, onTreeItemClick, selectedID }) => {
  /**
   * define selected item
   * @param id
   * @returns
   */
  const isSelectedItem = (id: number) => id === selectedID;

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
            id={item.id}
            name={item.name}
            onClick={onTreeItemClick}
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
            id={item.id}
            name={item.name}
            onClick={onTreeItemClick}
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
              id={item.id}
              name={item.name}
              onClick={onTreeItemClick}
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
              id={item.id}
              name={item.name}
              onClick={onTreeItemClick}
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
