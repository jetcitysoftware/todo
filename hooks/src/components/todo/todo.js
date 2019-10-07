import React, {useState} from "react";
import uuid from "uuid/v4";
import { If, Then, Else } from "../if";

import "./todo.scss";

const ToDo = (props) => {

  const [todoList,setTodoList] = useState([]);
  const [item,setItem] = useState({});
  const [editing, setEditing] = useState(false);

  const handleInputChange = e => {
    setItem({
      text: e.target.value,
      complete: !!e.target.complete,
      id: e.target.id || uuid()
    });
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();
    setTodoList([...todoList, item]);
  };

  const updateItem = e => {
    e.preventDefault();
    saveItem(item);
  };

  const toggleComplete = id => {
    let updateItem = todoList.filter(i => i.id === id)[0] || {};
    if (updateItem.id) {
      updateItem.complete = !updateItem.complete;
      saveItem(updateItem);
    }
  };

  const saveItem = updatedItem => {
    setTodoList(
      todoList.map(item =>
        item.id === updatedItem.id ? {...item, text:updatedItem.text} : item
      )
    );
    setEditing(false);
  };

  const toggleEdit = id => {
    setEditing( editing === id ? false : id );
  };

  const deleteItem = id => {
    setTodoList(
      todoList.filter(item => item.id !== id)
    );
  };

    return (
      <>
        <section className="todo">
          <header>
            <h2>There are {todoList.filter( item => !item.complete ).length} Items To Complete</h2>
          </header>

          <div>
            <form onSubmit={addItem}>
              <input
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </form>
          </div>

          <div>
            <ul>
              {todoList &&
                todoList.map(item => (
                  <li
                    className={`complete-${item.complete.toString()}`}
                    key={item.id}
                  >

                    <If condition={editing === item.id}>
                      <Then>
                        <form onSubmit={updateItem}>
                          <input
                            onChange={handleInputChange}
                            id={item.id}
                            defaultValue={item.text}
                          />
                        </form>
                      </Then>
                      <Else>
                        <span onClick={() => toggleComplete(item.id)}>
                          {item.text}
                        </span>
                      </Else>
                    </If>
                    <button onClick={() => toggleEdit(item.id)}>
                      edit
                    </button>
                    <button onClick={() => deleteItem(item.id)}>
                      delete
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </>
    );
};

export default ToDo;
