import React, { FC } from "react";
import styles from "./styles.module.css";
import { useContextMenu } from "../../../hook/useContextMenu";
import { Motion, spring } from "react-motion";

const ContextMenu: FC<any> = ({ menu, shouldShow }) => {
  const { xPos, yPos, showMenu } = useContextMenu();
  return (
    <Motion
      defaultStyle={{ opacity: 0 }}
      style={{ opacity: !showMenu ? spring(0) : spring(1) }}
    >
      {(interpolatedStyle) => (
        <>
          {showMenu && shouldShow ? (
            <div
              className={styles["menu-container"]}
              style={{
                top: yPos,
                left: xPos,
                opacity: interpolatedStyle.opacity,
              }}
            >
              {menu}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </Motion>
  );
};

export default ContextMenu;
