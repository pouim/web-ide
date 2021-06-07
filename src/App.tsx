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
  const [selectedItem, setSelectedItem] = useState<TreeData>(
    initialTreeData[0]
  );
  const [isEditMode, setIsEditMode] = useState<boolean>(false);


  useEffect(() => {
    localStorage.setItem('treeData', JSON.stringify(treeData))
  }, [treeData])

  const loadedTreeData = localStorage.getItem('treeData');
  useEffect(() => {
    
    loadedTreeData &&
      JSON.parse(loadedTreeData).length > 0 &&
      settreeData(JSON.parse(loadedTreeData));
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

  const findItem = (data: TreeData[], id: string) => {
    let result = null;

    for (let obj of data) {
      result = dfs(obj, id);
      if (result) {
        break;
      }
    }

    return result;
  };

  const changeItem = (data: TreeData[], id: string, newItem: TreeData) => {
    let result = null;

    result = data.map((item: TreeData) =>{
      let founded = dfs(item, id)
         if(founded)
         return { ...founded, children: [...item.children, newItem] }
       return item
    }
     
    );

    return result;
  };


  console.log(
    changeItem(treeData, selectedItem.id, {
      id: uuid(),
      name: "Pouyan",
      parent: selectedItem.id,
      children: [],
      isOpen: false,
      isFolder: true,
    })
  );

  const updateTreeData = (
    data: TreeData[],
    updatedItem: TreeData
  ): TreeData[] => {
    console.log('data', data)
    return data.map((item: TreeData) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }

      if (
        item.id !== updatedItem.id &&
        item.children &&
        item.children.length > 0
      ) {
        const foundedChild = findItem(item.children, selectedItem.id);
        const updatedChildren = item.children.map((childItem: TreeData) => {
          if (childItem.id === foundedChild.id) {
            return updatedItem;
          }
          if (
            childItem.id !== foundedChild.id &&
            childItem.children &&
            childItem.children.length > 0
          ) {
            updateTreeData(childItem.children, updatedItem);
          }
          return childItem;
        });

        return { ...item, children: updatedChildren };
      }

      return item;
    });


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

    const foundedItem = findItem(treeData, selectedItem.id);
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
      code: '',
      children: [],
      isOpen: false,
      isFolder: false,
    };

    const foundedItem = findItem(treeData, selectedItem.id);
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
      const foundedItem = findItem(treeData, selectedItem.id);
      const updatedItem = {
        ...foundedItem,
        name: e.target.value,
      };
      const updatedTreeData = updateTreeData(treeData, updatedItem);

      settreeData(updatedTreeData);
      setIsEditMode(false);
    }
  };
  
  function recursiveRemove(list: TreeData[], id: string) {
    return list
      .map((item: TreeData) => {
        return { ...item };
      })
      .filter((item: TreeData) => {
        if ("children" in item) {
          item.children = recursiveRemove(item.children, id);
        }
        return item.id !== id;
      });
  }


  const onDelete = () => {
    const updatedTreeData = recursiveRemove(treeData, selectedItem.id);

    settreeData(updatedTreeData);
  };

  const onSaveCodeHandler = (e: any) => {
    const foundedItem = findItem(treeData, selectedItem.id);
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
