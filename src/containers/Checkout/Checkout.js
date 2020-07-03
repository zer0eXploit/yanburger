import React, { Component, createRef, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
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

  render() {
    let checkoutSummary = <Redirect to="/" />;
    const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
    if (this.props.ingredients) {
      checkoutSummary = (
        <Fragment>
          {purchaseRedirect}
          <CheckoutSummary
            continue={this.checkoutContinueHandler}
            cancel={this.checkoutCancelHandler}
            ingredients={this.props.ingredients}
          />
          <div ref={this.contactFormRef}>
            {/* {Empty div for scroll target!} */}
          </div>
          <Route
            path={this.props.match.path + "/contact-info"}
            component={ContactData}
          />
        </Fragment>
      );
    }
    return checkoutSummary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
