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


  const onCreateNewFolder = () => {
     const newFolder: TreeData = {
       id: uuid(),
       name: 'New Folder',
       parent: selectedID,
       children: [],
       isOpen: false,
       isFolder: true,
     }

     const updatedTreeData = treeData.map((item: any) =>
       !item.parent
         ? item.id === selectedID
           ? { ...item, children: [...item.children, newFolder] }
           : item
         : item.children && item.children.length > 0
         ? item.children.map((childItem: any) =>
             childItem.id === selectedID
               ? { ...childItem, children: [...childItem.children, newFolder] }
               : childItem
           )
         : initialTreeData
     );

     settreeData(updatedTreeData)
  }



  function dfs(obj: any, targetId: any) {
    if (obj.id === targetId) {
      return obj
    }
    if (obj.nextItems) {
      for (let item of obj.nextItems) {
        let check: any = dfs(item, targetId)
        if (check) {
          return check
        }
      }
    }
    return null
  }
  
  let result = null
  
  for (let obj of treeData) {
    result = dfs(obj, selectedID)
    if (result) {
      break
    }
  }
 

  useEffect(() => {
    console.log(treeData, selectedID)
  }, [treeData])

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
