import React, { useEffect, useState } from "react";
import "./App.css";
import CodeEditor from "./component/Code-Editor";
import TreeView from "./component/treeview";
import { TreeData } from "./interface";
import { initialTreeData } from "./mock";
import uuid from 'react-uuid'

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

     const updatedTreeData = treeData.map((item: TreeData) =>
       item.children.map((childItem) =>
         childItem.id === selectedID
           ? {
               ...childItem,
               children: [...childItem.children, newFolder],
             }
           : childItem
       )
     );

     settreeData(updatedTreeData)
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
