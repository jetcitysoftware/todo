import React from "react";

import { TodoContext } from "./context.js";

class ToDoForm extends React.Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
    this.state = { item: {} };
  }

  handleInputChange = e => {
    let item = {
      text: e.target.value,
      complete: !!e.target.complete,
      id: e.target.id || null
    };
    this.setState({ item });
  };

  updateItem = e => {
    this.context.saveItem(this.state.item);
    this.props.toggleEdit && this.props.toggleEdit(this.state.item.id);
  };

  addItem = e => {
    this.context.addItem(this.state.item);
  };

  handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    let submitHandler = (this.props.item && this.updateItem) || this.addItem;
    submitHandler();
  };

  render() {
    let item = this.props.item || {};
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            defaultValue={item.text}
            id={item.id}
            onChange={this.handleInputChange}
            placeholder="Add To Do List Item"
          />
        </form>
      </div>
    );
  }
}

export default ToDoForm;
