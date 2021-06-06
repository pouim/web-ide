import React, { useEffect, useState } from "react";
import "./App.css";
import CodeEditor from "./component/Code-Editor";
import TreeView from "./component/treeview";
import { TreeData } from "./interface";
import { initialTreeData } from "./mock";
import uuid from 'react-uuid'
import { isTemplateMiddle } from "typescript";

function App() {
  const [treeData, settreeData] = useState<TreeData[]>(initialTreeData);
  const [selectedID, setSelectedID] = useState<string | null>(null);

  const onTreeItemClickHandler = (id: string) => {
    setSelectedID(id);
  };



  const  dfs = (obj: TreeData, targetId: any) => {
    if (obj.id === targetId) {
      return obj
    }
    if (obj.children) {
      for (let item of obj.children) {
        let check: any = dfs(item, targetId)
        if (check) {
          return check
        }
      }
    }
    return null
  }



  const findItem = (data: TreeData[]) => {
    let result = null;

    for (let obj of data) {
      result = dfs(obj, selectedID);
      if (result) {
        break;
      }
    }

    return result
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
          childItem.id === foundedChild.id
            ? updatedItem
            : childItem
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
       name: 'New Folder',
       parent: selectedID,
       children: [],
       isOpen: false,
       isFolder: true,
     }
    
    const foundedItem = findItem(treeData);
    const updatedItem = {
      ...foundedItem,
      children: [...foundedItem.children, newFolder],
    };
    const updatedeTreeData = updateTreeData(treeData, updatedItem);

    settreeData(updatedeTreeData);

  }

    
    
  



  

  

  return (
    <div className="container">
      <div className="left">
        <TreeView
          data={treeData}
          onTreeItemClick={onTreeItemClickHandler}
          onCreateNewFolder={onCreateNewFolder}
          selectedID={selectedID}
        />
      </div>
      <div className="main">{selectedID && <CodeEditor />}</div>
    </div>
  );
}

export default App;
