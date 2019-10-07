import React from "react";
import ReactDOM from "react-dom";

import ToDoContext from "./components/todo/context.js";

import App from "./app.js";

class Main extends React.Component {
  render() {
    return (
      <ToDoContext>
        <App />
      </ToDoContext>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);
