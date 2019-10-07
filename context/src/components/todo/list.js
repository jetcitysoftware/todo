import React from "react";

import { If, Then, Else } from "../if";
import { TodoContext } from "./context.js";
import ToDoForm from "./form.js";

import "./todo.scss";

class ToDo extends React.Component {
  static contextType = TodoContext;

  constructor(props) {
    super(props);
    this.state = { item: {}, editing: false };
  }

  toggleEdit = id => {
    let editing = this.state.editing === id ? false : id;
    this.setState({ editing });
  };

  render() {
    return (
      <>
        <div>
          <ul>
            {this.context.todoList &&
              this.context.todoList.map(item => (

                <li
                  className={`complete-${item.complete.toString()}`}
                  key={item.id}
                >

                  <If condition={this.state.editing === item.id}>
                    <Then>
                        <ToDoForm toggleEdit={this.toggleEdit} item={item} />
                    </Then>
                    <Else>
                        <span onClick={() => this.context.toggleComplete(item.id)}>
                          {item.text}
                        </span>
                    </Else>
                  </If>
                  <button onClick={() => this.toggleEdit(item.id)}>
                    edit
                  </button>
                  <button onClick={() => this.context.deleteItem(item.id)}>
                    delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
}

export default ToDo;
