import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseBurgerInit,
  setAuthRedirectPath,
} from "../../store/actions/index";

import axios from "../../axios-order";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.initIngredientsHandler();
  }

  updatePurchasableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((acc, cur) => acc + cur, 0);

    return sum > 0;
  }

  purchasingHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.initPurchaseHandler();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledCtrlInfo = { ...this.props.ingredients }; //i.e., which controls are disabled

    for (let key in disabledCtrlInfo) {
      disabledCtrlInfo[key] = disabledCtrlInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ marginTop: "20%", textAlign: "center" }}>
        Ingredients can't be loaded!
      </p>
    ) : (
      <div style={{ marginTop: "20%" }}>
        <Spinner />
      </div>
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.rmIngredientHandler}
            disabledCtrlInfo={disabledCtrlInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchasableState(this.props.ingredients)}
            purchasing={this.purchasingHandler}
            isAuth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          continue={this.purchaseContinueHandler}
          cancel={this.purchaseCancelHandler}
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} click={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientName) =>
      dispatch(addIngredient(ingredientName)),
    rmIngredientHandler: (ingredientName) =>
      dispatch(removeIngredient(ingredientName)),
    initIngredientsHandler: () => dispatch(initIngredients()),
    initPurchaseHandler: () => dispatch(purchaseBurgerInit()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
