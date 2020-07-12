import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import { auth, setAuthRedirectPath } from "../../store/actions/index";
import { updateObject } from "../../shared/utility";

import styles from "./Auth.module.css";

class Authentication extends Component {
  state = {
    controls: {
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        invalidMessage: "Password must be more than 5 characters!",
        validityCheck: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
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

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.redirectPath !== "/") {
      this.props.setRedirectPathHandler();
    }
  }

  switchFormMode = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };

  onChangeHandler = (event, elementIdentifier) => {
    const updatedElement = updateObject(
      this.state.controls[elementIdentifier],
      {
        value: event.target.value,
        valid: this.validityCheck(
          this.state.controls[elementIdentifier].validityCheck,
          event.target.value
        ),
        touched: true,
      }
    );

    const updatedControls = updateObject(this.state.controls, {
      [elementIdentifier]: updatedElement,
    });

    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = (
      <form onSubmit={this.onSubmitHandler}>
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
        <Button btnType="Success">Submit</Button>
      </form>
    );

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.Auth}>
        {this.props.isAuth ? <Redirect to={this.props.redirectPath} /> : null}
        {errorMessage}
        {form}
        <Button btnType="Danger" click={this.switchFormMode}>
          Switch To {this.state.isSignUp ? "Login" : "Signup"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    isBuildingBurger: state.burger.building,
    redirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(auth(email, password, isSignUp));
    },
    setRedirectPathHandler: () => {
      dispatch(setAuthRedirectPath("/"));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
