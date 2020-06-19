import React from "react";
import Logo from "../../Logo/Logo";
import styles from "./Toolbar.module.css";
import NavItems from "../NavigationItems/NavigationItems";
import HumbergerMenu from "../SideDrawer/HumburgerMenu/HumbergerMenu";

const toolbar = (props) => {
  return (
    <header className={styles["Toolbar"]}>
      <HumbergerMenu click={props.click} />
      <div className={styles.Logo}>
        <Logo />
      </div>
      <nav className={styles.DesktopOnly}>
        <NavItems />
      </nav>
    </header>
  );
};

export default toolbar;
