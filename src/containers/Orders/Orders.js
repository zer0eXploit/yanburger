import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedData = [];
        for (const key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          });
        }

        this.setState({ orders: fetchedData, loading: false });
      })
      .catch((e) => {
        console.log(e.message);
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
