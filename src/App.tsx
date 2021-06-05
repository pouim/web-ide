import React, { useState } from "react";
import "./App.css";
import CodeEditor from "./component/Code-Editor";
import TreeView from "./component/treeview";
import { initialTreeData } from "./mock";

function App() {
  const [treeData, settreeData] = useState(initialTreeData);
  const [selectedID, setSelectedID] = useState<number | null>(null);

  const onTreeItemClickHandler = (id: number) => {
    setSelectedID(id);
  };

  


 

  return (
    <div className="container">
      <div className="left">
        <TreeView data={treeData} onTreeItemClick={onTreeItemClickHandler} selectedID={selectedID} />
      </div>
      <div className="main">
        {selectedID && <CodeEditor />}
      </div>
    </div>
  );
}

export default App;
