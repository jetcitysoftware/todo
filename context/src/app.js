import React from "react";

import ToDo from "./components/todo/list.js";
import ToDoForm from "./components/todo/form.js";
import Counter from "./components/counter/counter.js";

export default class App extends React.Component {
  render() {
    return (
      <>
        <section className="todo">
          <Counter />
          <ToDoForm />
          <ToDo />
        </section>
      </>
    );
  }
}
