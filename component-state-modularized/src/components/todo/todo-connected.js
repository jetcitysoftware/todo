import React from "react";
import { When } from "../if";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import TodoItem from "./item.js";

import "./todo.scss";

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

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

  callAPI = (url, method='get', body, handler, errorHandler) => {

    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    .then(response => response.json())
    .then(data => typeof handler === "function" ? handler(data) : null )
    .catch( (e) => typeof errorHandler === "function" ? errorHandler(e) : console.error(e)  );
  };

  addItem = (item) => {

    const _updateState = newItem =>
      this.setState({
        todoList: [...this.state.todoList, newItem]
      });

    this.callAPI( todoAPI, 'POST', item, _updateState );

  };

  deleteItem = id => {

    const _updateState = (results) =>
      this.setState({
        todoList: this.state.todoList.filter(item => item._id !== id)
      });

    this.callAPI( `${todoAPI}/${id}`, 'DELETE', undefined, _updateState );

  };

  saveItem = updatedItem => {

    const _updateState = (newItem) =>
      this.setState({
        todoList: this.state.todoList.map(item =>
          item._id === newItem._id ? newItem : item
        )
      });

    this.callAPI( `${todoAPI}/${updatedItem.id}`, 'PUT', updatedItem, _updateState );

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

  getTodoItems = () => {
    const _updateState = data => this.setState({ todoList: data.results });
    this.callAPI( todoAPI, 'GET', undefined, _updateState );
  };

  componentDidMount = () => {
    this.getTodoItems();
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
