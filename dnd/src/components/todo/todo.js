import React from "react";
import { connect } from 'react-redux';

import DropZone from "../dnd/dropzone.js";
import { When } from "../if";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import TodoItem from "./item.js";

import trashCan from './garbage.png';

import "./todo.scss";
import * as actions from "../../store/todo.store.js";
import * as itemActions from "../../store/item.store.js";

const ToDo = (props) => {

  function handleDelete(targetPayload, droppedPayload) {
    props.deleteItem(droppedPayload._id);
  }

  return (
    <>
      <header>
        <h2>
          There are {props.todo.todoList.filter( item => !item.complete ).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <TodoForm />
        </div>

        <div>
          <TodoList />
        </div>

      </section>

      <DropZone className="trash" hoverClass="hover" onDrop={handleDelete}>
        <img src={trashCan} alt="Delete Item" />
      </DropZone>

      <When condition={props.item._id}>
        <TodoItem hideDetails={props.hideDetails} />
      </When>
    </>
  );
};

const mapStateToProps = state => ({
  todo: state.todo,
  item: state.item,
});

const mapDispatchToProps = (dispatch, getState) => ({
  deleteItem: id => dispatch(actions.deleteItem(id)),
  hideDetails: id => dispatch(itemActions.hideDetails()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDo);

