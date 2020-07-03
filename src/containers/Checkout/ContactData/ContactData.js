import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { purchaseBurger } from "../../../store/actions/index";

import styles from "./ContactData.module.css";

import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        invalidMessage: "Please Enter A Valid Name!",
        validityCheck: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        invalidMessage: "Please Enter A Valid Street!",
        validityCheck: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        invalidMessage: "Please Enter A Valid Zip Code!",
        validityCheck: {
          required: true,
          minLength: 5,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        invalidMessage: "Please Enter A Valid Country!",
        validityCheck: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        invalidMessage: "Please Enter A Valid Email!",
        validityCheck: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          placeholder: "Select A Delivery Method",
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validityCheck: {},
        valid: true,
      },
    },
    overAllValid: false,
    loading: false,
  };

  validityCheck(rule, value) {
    let valid = true;
    if (rule.required) {
      valid = value.trim() !== "" && valid;
    }

    if (rule.minLength) {
      valid = value.trim().length >= rule.minLength && valid;
    }

    if (rule.maxLength) {
      valid = value.trim().length <= rule.maxLength && valid;
    }

    if (rule.email) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valid = pattern.test(value.trim()) && valid;
    }

    return valid;
  }

  onChangeHandler = (event, elementIdentifier) => {
    const newOrderForm = {
      ...this.state.orderForm,
    };

    const newOrderElement = {
      ...newOrderForm[elementIdentifier],
    };

    newOrderElement.value = event.target.value;
    newOrderElement.valid = this.validityCheck(
      newOrderElement.validityCheck,
      newOrderElement.value
    );
    newOrderElement.touched = true;

    newOrderForm[elementIdentifier] = newOrderElement;

    let overAllValidity = true;

    for (let key in newOrderForm) {
      overAllValidity = newOrderForm[key].valid && overAllValidity;
    }

    console.log(newOrderForm);
    this.setState({ orderForm: newOrderForm, overAllValid: overAllValidity });
  };

  onOrderHandler = (event) => {
    event.preventDefault();
    if (!this.state.overAllValid) {
      return null;
    }
    const orderData = {};
    for (let key in this.state.orderForm) {
      orderData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData,
      date: new Date(),
    };

    this.props.onOrderBurger(order);
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.onOrderHandler}>
        {formElementsArray.map((ele) => {
          return (
            <Input
              elementType={ele.config.elementType}
              elementConfig={ele.config.elementConfig}
              value={ele.config.value}
              key={ele.id}
              changed={(event) => {
                this.onChangeHandler(event, ele.id);
              }}
              invalid={!ele.config.valid}
              invalidMessage={ele.config.invalidMessage}
              shouldValidate={ele.config.validityCheck}
              touched={ele.config.touched}
              label={ele.config.elementConfig.placeholder}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.overAllValid}>
          Order Now
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactInfo}>
        <h4>Please Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => {
      dispatch(purchaseBurger(orderData));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
