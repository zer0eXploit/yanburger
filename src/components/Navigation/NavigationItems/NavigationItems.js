import React from "react";
import styles from "./NavigationItems.module.css";
import NavItem from "./NavigationItem/NavigationItem";

const navItems = (props) => (
  <ul className={styles["NavigationItems"]}>
    <NavItem link="/" exact>
      Burger Builder
    </NavItem>
    {props.isAuth ? <NavItem link="/orders">Orders</NavItem> : null}
    {props.isAuth ? (
      <NavItem link="/logout">Logout</NavItem>
    ) : (
      <NavItem link="/auth">Authenticate</NavItem>
    )}
  </ul>
);

export default navItems;
