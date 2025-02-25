import { Component } from "react";

class ErrorBoundry extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(err) {
    this.setState({ hasError: true });
    console.log(err);
  }

  render() {
    let output;
    if (this.state.hasError) {
      output = <p>something went wrong</p>;
    } else {
      output = this.props.children;
    }
    return output;
  }
}

export default ErrorBoundry;
