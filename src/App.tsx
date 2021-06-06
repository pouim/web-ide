import React, { useEffect, useState } from "react";
import "./App.css";
import CodeEditor from "./component/Code-Editor";
import TreeView from "./component/treeview";
import { TreeData } from "./interface";
import { initialTreeData } from "./mock";
import uuid from 'react-uuid'

function App() {
  const [treeData, settreeData] = useState<TreeData[]>(initialTreeData);
  const [selectedItem, setSelectedItem] = useState<TreeData>(
    initialTreeData[0]
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);


  useEffect(() => {
    localStorage.setItem('treeData', JSON.stringify(treeData))
  }, [treeData])

  const loadedTreeData = localStorage.getItem('treeData');
  useEffect(() => {
    
    loadedTreeData && settreeData(JSON.parse(loadedTreeData))
  }, [])

  const onTreeItemClickHandler = (item: TreeData) => {
    setSelectedItem(item);
  };

  const dfs = (obj: TreeData, targetId: any) => {
    if (obj.id === targetId) {
      return obj;
    }
    if (obj.children) {
      for (let item of obj.children) {
        let check: any = dfs(item, targetId);
        if (check) {
          return check;
        }
      }
    }
    return null;
  };

  const findItem = (data: TreeData[]) => {
    let result = null;

    for (let obj of data) {
      result = dfs(obj, selectedItem.id);
      if (result) {
        break;
      }
    }

    return result;
  };

  const updateTreeData = (
    data: TreeData[],
    updatedItem: TreeData
  ): TreeData[] => {
    const newTree = data.map((item: TreeData) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }

      if (
        item.id !== updatedItem.id &&
        item.children &&
        item.children.length > 0
      ) {
        const foundedChild = findItem(item.children);
        const updatedChildren = item.children.map((childItem: TreeData) =>
          childItem.id === foundedChild.id ? updatedItem : childItem
        );

        return { ...item, children: updatedChildren };
      }

      return item;
    });

    return newTree;
  };

  const onCreateNewFolder = () => {
    const newFolder: TreeData = {
      id: uuid(),
      name: "New Folder",
      parent: selectedItem.id,
      children: [],
      isOpen: false,
      isFolder: true,
    };

    const foundedItem = findItem(treeData);
    const updatedItem = {
      ...foundedItem,
      children: [...foundedItem.children, newFolder],
    };
    const updatedTreeData = updateTreeData(treeData, updatedItem);

    settreeData(updatedTreeData);
  };

  const onCreateNewFile = () => {
    const newFile: TreeData = {
      id: uuid(),
      name: "New File",
      parent: selectedItem.id,
      children: [],
      isOpen: false,
      isFolder: false,
    };

    const foundedItem = findItem(treeData);
    const updatedItem = {
      ...foundedItem,
      children: [...foundedItem.children, newFile],
    };
    const updatedTreeData = updateTreeData(treeData, updatedItem);

    settreeData(updatedTreeData);
  };

  const onRenameStarted = () => {
    setIsEditMode(true);
  };

  const onRenameDone = (e: any) => {
    if (e.key === "Enter") {
      const foundedItem = findItem(treeData);
      const updatedItem = {
        ...foundedItem,
        name: e.target.value,
      };
      const updatedTreeData = updateTreeData(treeData, updatedItem);

      settreeData(updatedTreeData);
      setIsEditMode(false);
    }
  };

  const onDelete = () => {
    const updatedTreeData = treeData.filter(
      (item: TreeData) => item.id !== selectedItem.id
    );

    settreeData(updatedTreeData);
  };

  const onSaveCodeHandler = (e: any) => {
    const foundedItem = findItem(treeData);
    const updatedItem = {
      ...foundedItem,
      code: e.target.value,
    };
    const updatedTreeData = updateTreeData(treeData, updatedItem);

    settreeData(updatedTreeData);
  };

  return (
    <div className="container">
      <div className="left">
        <TreeView
          data={treeData}
          onTreeItemClick={onTreeItemClickHandler}
          onCreateNewFolder={onCreateNewFolder}
          onCreateNewFile={onCreateNewFile}
          onRenameStarted={onRenameStarted}
          onRenameDone={onRenameDone}
          onDelete={onDelete}
          selectedItem={selectedItem}
          isEditMode={isEditMode}
        />
      </div>
      <div className="main">
        {!selectedItem.isFolder ? (
          <CodeEditor onSaveCode={onSaveCodeHandler} code={selectedItem.code} />
        ) : (
          <h1 className="logo">WEB IDE</h1>
        )}
      </div>
    </div>
  );
}

export default App;
