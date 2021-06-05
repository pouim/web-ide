import React, { FC } from "react";
import { TreeData } from "../../interface";
import styles from "./styles.module.css";
import TreeItem from "./treeview-item";

interface TreeViewProps {
  data: TreeData[];
}

const TreeView: FC<TreeViewProps> = ({ data }) => {


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
            name={item.name}
            isDefaultOpen={item.isOpen}
            isFolder={item.isFolder}
          >
            {renderChildTreeItems(item.children)}
          </TreeItem>
        );
      } else {
        return (
          <TreeItem
            name={item.name}
            isDefaultOpen={item.isOpen}
            isFolder={item.isFolder}
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
              name={item.name}
              isDefaultOpen={item.isOpen}
              isFolder={item.isFolder}
            >
              {renderChildTreeItems(item.children)}
            </TreeItem>
          );
        } else {
          return (
            <TreeItem
              name={item.name}
              isDefaultOpen={item.isOpen}
              isFolder={item.isFolder}
            ></TreeItem>
          );
        }
      }
    });

    return TreeNode;
  };

  return (
    <div className={styles["wrapper"]}>
      {renderSubTreeItems(data)}
    </div>
  );
};

export default TreeView;
