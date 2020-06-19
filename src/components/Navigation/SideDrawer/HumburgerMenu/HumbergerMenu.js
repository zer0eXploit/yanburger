import React from "react";
import styles from "./HumbergerMenu.module.css";

const humbergerMenu = (props) => (
  <div onClick={props.click} className={styles.HumbergerMenu}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default humbergerMenu;
