import React from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(
        (req) => {
          this.setState({ error: null });
          return req;
        },
        (err) => {
          this.setState({ error: err });
          console.log(err);
        }
      );

      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
          console.log(err);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    modalClickDismissHandler = () => {
      this.setState({
        error: null,
      });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} click={this.modalClickDismissHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
