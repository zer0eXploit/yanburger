import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import styles from "./ContactData.module.css";

import axios from "../../../axios-order";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
    loading: false,
  };

  onOrderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        address: {
          name: "Yan Waipann",
          zipCode: "11041",
          country: "Myanmar",
        },
        email: "yanwaipann@yanburger.com",
      },
      deliveryMethod: "FastestMode",
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e.message);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          className={styles.Input}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="zip"
          placeholder="Zip Code"
        />
        <Button btnType="Success" click={this.onOrderHandler}>
          Order Now
        </Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;
