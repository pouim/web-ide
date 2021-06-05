import React, { useState } from "react";
import "./App.css";
import TreeView from "./component/treeview";
import { initialTreeData } from "./mock";

function App() {
  const [treeData, settreeData] = useState(initialTreeData);

  return (
    <div className="container">
      <div className="left">
        <TreeView data={treeData} />
      </div>
      <div className="main">MAIN</div>
    </div>
  );
}

export default App;
