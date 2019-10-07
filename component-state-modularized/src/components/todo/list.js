import React from "react";

class TodoList extends React.Component {

  render() {

    const list = this.props.list || [];

    return (
      <>
        <ul>
          { list.map(item => (
            <li
              className={`complete-${item.complete.toString()}`}
              key={item._id}
            >
              <span onClick={() => this.props.handleComplete(item._id)}>
                {item.text}
              </span>
              <button onClick={() => this.props.handleDetails(item._id)}>
                Details
              </button>
              <button onClick={() => this.props.handleDelete(item._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default TodoList;
