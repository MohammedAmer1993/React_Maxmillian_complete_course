import classes from "./User.module.css";
import { Component } from "react";

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

class User extends Component {
  componentWillUnmount() {
    console.log("goodbye user");
  }
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

export default User;
