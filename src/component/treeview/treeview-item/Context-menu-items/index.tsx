import React, { FC } from "react";
import styles from "./styles.module.css";



type MenuItem = {
  id: number;
  name: string;
  onClick: any;
}
interface ContextMenuItemsProps {
  menuItems: MenuItem[]
}


export const ContextMenuItems: FC<ContextMenuItemsProps> = ({menuItems}) => {
  return (
    <ul className={styles.ContextMenuItems}>
      {menuItems.map((item: MenuItem) => (
        <li key={item.id} onClick={() => item.onClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};
