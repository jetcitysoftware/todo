import React from "react";
import uuid from "uuid/v4";

export const TodoContext = React.createContext();

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      addItem: this.addItem,
      saveItem: this.saveItem,
      deleteItem: this.deleteItem,
      toggleComplete: this.toggleComplete,
      activeItems: this.activeItems,
    };
  }

  activeItems = () => {
    return this.state.todoList.filter( item => !item.complete ).length;
  }
  addItem = item => {
    item.id = uuid();
    this.setState({
      todoList: [...this.state.todoList, item]
    });
  };

  toggleComplete = id => {
    let item = this.state.todoList.filter(i => i.id === id)[0] || {};
    if (item.id) {
      item.complete = !item.complete;
      this.saveItem(item);
    }
  };

  saveItem = updatedItem => {
    this.setState({
      todoList: this.state.todoList.map(item =>
        item.id === updatedItem.id ? {...item, text:updatedItem.text} : item
      )
    });
  };

  deleteItem = id => {
    this.setState({
      todoList: this.state.todoList.filter(item => item.id !== id)
    });
  };

  render() {
    return (
      <TodoContext.Provider value={this.state}>
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}

export default Todo;
