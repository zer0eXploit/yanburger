import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authLogout } from "../../../store/actions/index";

class Logout extends Component {
  componentDidMount() {
    this.props.logoutHandler();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutHandler: () => {
    dispatch(authLogout());
  },
});

export default connect(null, mapDispatchToProps)(Logout);
