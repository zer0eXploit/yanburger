import React from "react";
import styles from "./Logo.module.css";
import burgerLogo from "../../assets/images/logo.png";

const logo = (props) => (
  <div className={styles["Logo"]}>
    <img src={burgerLogo} alt="BurgerLogo" />
  </div>
);

export default logo;
