import React, {useReducer,useState} from 'react';

import Auth from '../auth/auth.js';

import styles from './todo.module.scss';

const initialState = { toDoItems: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      let item = {title:action.payload, status:false};
      return {toDoItems: [...state.toDoItems, item]};
    case 'toggle':
      return { toDoItems: state.toDoItems.map( (item,idx) => idx === action.payload ? {title:item.title, status:!item.status} : item ) };
    default:
      throw new Error();
  }
}

const Todo = () => {

  const [item, setItem] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const _handleForm = (e) => {
    e.preventDefault();
    e.target.reset();
    dispatch({type: 'add', payload:item});
  };

  const _toggle = (e,id) => {
    e.preventDefault();
    dispatch({type: 'toggle', payload:id});
  };

  return (
    <section className={styles.todo}>

      <Auth capability="read">
        {state.toDoItems.map( (item,idx) =>
          <div key={idx} onClick={(e) => _toggle(e,idx)}>
            <span className={styles[`complete-${item.status}`]}> {item.title} </span>
          </div>
        )}
      </Auth>

      <Auth capability="create">
        <form onSubmit={_handleForm}>
          <input
            onChange={(e) => setItem(e.target.value)}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>

    </section>
  );
};

export default Todo;
