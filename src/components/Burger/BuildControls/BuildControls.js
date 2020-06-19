import React from "react";
import BuildControl from "../BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          added={() => {
            props.ingredientAdded(ctrl.type);
          }}
          removed={() => {
            props.ingredientRemoved(ctrl.type);
          }}
          key={ctrl.label}
          label={ctrl.label}
          disabledInfo={props.disabledCtrlInfo[ctrl.type]}
        />
      ))}
      <button
        onClick={props.purchasing}
        disabled={!props.purchasable}
        className={styles.OrderButton}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
