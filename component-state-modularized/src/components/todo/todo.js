import React from "react";
import uuid from "uuid/v4";
import { When } from "../if";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import TodoItem from "./item.js";

import "./todo.scss";

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      item: {},
      showDetails: false,
      details: {}
    };
  }

  addItem = (item) => {

    item._id = uuid();
    item.complete = false;

    this.setState({
      todoList: [...this.state.todoList, item]
    });

  };

  deleteItem = id => {

    this.setState({
      todoList: this.state.todoList.filter(item => item._id !== id)
    });

  };

  saveItem = updatedItem => {

    this.setState({
      todoList: this.state.todoList.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      )
    });

  };

  toggleComplete = id => {
    let item = this.state.todoList.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      this.saveItem(item);
    }
  };

  toggleDetails = id => {
    let showDetails = ! this.state.showDetails;
    let details = this.state.todoList.filter( item => item._id === id )[0] || {}
    this.setState({details, showDetails});
  }

  render() {

    return (
      <>
        <header>
          <h2>
            There are
            {this.state.todoList.filter( item => !item.complete ).length}
            Items To Complete
          </h2>
        </header>

        <section className="todo">

          <div>
            <TodoForm handleSubmit={this.addItem} />
          </div>

          <div>
            <TodoList
              list={this.state.todoList}
              handleComplete={this.toggleComplete}
              handleDetails={this.toggleDetails}
              handleDelete={this.deleteItem}
              />
          </div>
        </section>

        <When condition={this.state.showDetails}>
          <TodoItem handleDetails={this.toggleDetails} item={this.state.details} />
        </When>
      </>
    );
  }
}

export default ToDo;
