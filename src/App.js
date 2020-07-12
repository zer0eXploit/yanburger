import React, { Component, Suspense } from "react";
import "./App.css";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import Spinner from "./components/UI/Spinner/Spinner";
import Logout from "./containers/Auth/Logout/Logout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { autoAuth } from "./store/actions/index";

const Authentication = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    const authRouteComponent = (
      <Route
        path="/auth"
        render={() => {
          return (
            <Suspense
              fallback={
                <div style={{ marginTop: "20%" }}>
                  <Spinner />
                </div>
              }
            >
              <Authentication />
            </Suspense>
          );
        }}
      />
    );

    const checkoutRouteComponent = (
      <Route
        path="/checkout"
        render={(props) => {
          return (
            <Suspense
              fallback={
                <div style={{ marginTop: "20%" }}>
                  <Spinner />
                </div>
              }
            >
              <Checkout {...props} />
            </Suspense>
          );
        }}
      />
    );

    const orderRouteComponent = (
      <Route
        path="/orders"
        render={() => {
          return (
            <Suspense
              fallback={
                <div style={{ marginTop: "20%" }}>
                  <Spinner />
                </div>
              }
            >
              <Orders />
            </Suspense>
          );
        }}
      />
    );

    let routes = (
      <Switch>
        {authRouteComponent}
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          {checkoutRouteComponent}
          {orderRouteComponent}
          {authRouteComponent}
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => {
      dispatch(autoAuth());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
