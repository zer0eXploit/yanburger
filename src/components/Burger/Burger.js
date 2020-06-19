import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let ingredientsArray = Object.keys(props.ingredients)
    .map((igKey) => {
      // igKey is string
      return [...Array(props.ingredients[igKey])].map((_, idx) => {
        return <BurgerIngredient key={igKey + idx} type={igKey} />;
      });
    })
    .reduce((accumulator, currentValue) => {
      return accumulator.concat(currentValue);
    }, []);

  if (ingredientsArray.length === 0) {
    ingredientsArray = <p>Please add some ingredients!</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientsArray}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
