import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredienstList = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>{ingredienstList}</ul>
      <p>
        <strong>Total price: {props.totalPrice.toFixed(2)}</strong>
      </p>

      <div style={{ textAlign: "center" }}>
        <p>Continue to checkout?</p>
        <Button btnType="Success" click={props.continue}>
          Continue
        </Button>
        <Button btnType="Danger" click={props.cancel}>
          Cancel
        </Button>
      </div>
    </Aux>
  );
};

export default orderSummary;
