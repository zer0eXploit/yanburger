import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-order";

const INGREDIENT_PRICES = {
  salad: 0.2,
  bacon: 2,
  cheese: 0.4,
  meat: 2,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((e) => {
        console.log(e);
        // this.setState({
        //   ingredients: {
        //     meat: 2,
        //     cheese: 0,
        //     salad: 0,
        //     bacon: 0,
        //   },
        // });
      });
  }

  updatePurchableState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((acc, cur) => acc + cur, 0);

    this.setState({ purchasable: sum > 0 });
  }

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];

    queryParams.push(`totalPrice=${this.state.totalPrice}`);
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchableState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldPrice = this.state.totalPrice;
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = newCount;

    const priceDeduction = INGREDIENT_PRICES[type];

    const newPrice = oldPrice - priceDeduction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchableState(updatedIngredients);
  };

  render() {
    const disabledCtrlInfo = { ...this.state.ingredients }; //i.e., which controls are disabled

    for (let key in disabledCtrlInfo) {
      disabledCtrlInfo[key] = disabledCtrlInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = (
      <div style={{ marginTop: "15%" }}>
        <Spinner />
      </div>
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledCtrlInfo={disabledCtrlInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          continue={this.purchaseContinueHandler}
          cancel={this.purchaseCancelHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
