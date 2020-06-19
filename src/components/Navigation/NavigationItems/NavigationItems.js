import React from "react";
import styles from "./NavigationItems.module.css";
import NavItem from "./NavigationItem/NavigationItem";

const navItems = (props) => (
  <ul className={styles["NavigationItems"]}>
    <NavItem active link="/">
      Burger Builder
    </NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default navItems;
