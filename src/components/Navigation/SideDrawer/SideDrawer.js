import React from "react";
import Logo from "../../Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import styles from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  let sideDrawerClasses = [styles["SideDrawer"], styles["Close"]];
  if (props.open) {
    sideDrawerClasses = [styles["SideDrawer"], styles["Open"]];
  }

  return (
    <Aux>
      <Backdrop show={props.open} click={props.close} />
      <div className={sideDrawerClasses.join(" ")} onClick={props.close}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
