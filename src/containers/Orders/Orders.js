import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-order";
import { fetchOrdersStart } from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.orderFetchHandler();
  }

  render() {
    return this.props.loading ? (
      <div style={{ marginTop: "50%" }}>
        <Spinner />
      </div>
    ) : (
      <Fragment>
        {this.props.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          );
        })}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderFetchHandler: () => {
      dispatch(fetchOrdersStart());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
