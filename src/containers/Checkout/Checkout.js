import React, { Component, createRef, Fragment } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  contactFormRef = createRef();

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace("/checkout/contact-info");
  };

  componentDidUpdate() {
    this.contactFormRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  UNSAFE_componentWillMount() {
    let ingredients = {};
    let price = 0;
    const _ = new URLSearchParams(this.props.location.search);
    for (const item of _.entries()) {
      if (item[0] === "totalPrice") {
        price = item[1];
      } else {
        ingredients[item[0]] = +item[1];
      }
    }
    this.setState({ ingredients, totalPrice: price });
  }

  render() {
    return (
      <Fragment>
        <CheckoutSummary
          continue={this.checkoutContinueHandler}
          cancel={this.checkoutCancelHandler}
          ingredients={this.state.ingredients}
        />
        <div ref={this.contactFormRef}>
          {/* {Empty div for scroll target!} */}
        </div>
        <Route
          path={this.props.match.path + "/contact-info"}
          render={(props) => {
            return (
              <ContactData
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                {...props}
              />
            );
          }}
        />
      </Fragment>
    );
  }
}

export default Checkout;
