import React from "react";
import styles from "./NavigationItems.module.css";
import NavItem from "./NavigationItem/NavigationItem";

const navItems = (props) => (
  <ul className={styles["NavigationItems"]}>
    <NavItem link="/" exact>
      Burger Builder
    </NavItem>
    <NavItem link="/orders">Orders</NavItem>
  </ul>
);

export default navItems;
