import React from "react";
import styles from "./Order.module.css";

const order = (props) => {
  const ingredientsArray = [];

  for (const ingredientName in props.ingredients) {
    ingredientsArray.push({
      name: ingredientName,
      number: props.ingredients[ingredientName],
    });
  }

  let ingredientOutput = ingredientsArray.map((ig) => {
    return (
      <span key={ig.name}>
        {ig.name} ({ig.number})
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>Ingredients: </p>
      <div className={styles.IngredientsContainer}>{ingredientOutput}</div>
      <p>Price: USD {props.price.toFixed(2)}</p>
    </div>
  );
};

export default order;
