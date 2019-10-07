import React, { useContext, useState } from 'react';
import {connect} from "react-redux";

import Draggable from '../dnd/draggable.js';
import { Unless, When } from '../if/';
import { SettingsContext } from '../../context/settings.js';
import * as actions from "../../store/todo.store.js";
import * as itemActions from "../../store/item.store.js";

const TodoList = (props) => {

  const [page, setPage] = useState(0);
  const context = useContext(SettingsContext);

  const start = context.maxVisible * page;
  const end = start + context.maxVisible;
  const list = props.todo.todoList ? props.todo.todoList.slice(start, end) : [];

  return (
    <>
      <ul>
        {list.map(item => (
          <Unless key={item._id} condition={item.complete && !context.showCompleted}>
            <li
              className={`complete-${item.complete.toString()}`}
            >
              <Draggable payload={item}>
                <span onClick={() => props.toggleComplete(item._id)}>
                  {item.text}
                </span>
              </Draggable>

              <button onClick={() => props.showDetails(item)}>
                Details
              </button>
            </li>
          </Unless>
        ))}
      </ul>

      <When condition={page > 0}>
        <button onClick={() => setPage(page - 1)}>Previous</button>
      </When>

      <When condition={props.todo.todoList.length > end}>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </When>

    </>
  );
};

const mapStateToProps = state => ({
  todo: state.todo,
});

const mapDispatchToProps = (dispatch, getState) => ({
  addItem: payload => dispatch(actions.addItem(payload)),
  toggleComplete: id => dispatch(actions.toggleComplete(id)),
  showDetails: item => dispatch(itemActions.showDetails(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

