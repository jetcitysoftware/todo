import React from "react";
import { TodoContext } from "../todo/context.js";

class Counter extends React.Component {
  static contextType = TodoContext;

  render() {
    return (
      <div>
        <h2>There are {this.context.activeItems()} items in the list</h2>
      </div>
    );
  }
}

export default Counter;
