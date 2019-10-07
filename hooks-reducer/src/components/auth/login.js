import superagent from 'superagent';
import React, {useContext, useState} from 'react';
import { LoginContext } from './context.js';

const API = process.env.REACT_APP_API;

const If = props => {
  return !!props.condition ? props.children : null;
};

const Login = (props) => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const context = useContext(LoginContext);

  const _handleUsername = e => {
    setUsername(e.target.value);
  };

  const _handlePassword = e => {
    setPassword(e.target.value);
  };

  const _handleSubmit = (e) => {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then(response => {
        let token = response.text;
        context.login(token);
      })
      .catch(console.error);
  };

    return (
      <>
        <If condition={context.loggedIn}>
          <button onClick={context.logout}>
            Log Out
          </button>
        </If>
        <If condition={!context.loggedIn}>
          <div>
            <form onSubmit={_handleSubmit}>
              <input
                placeholder="username"
                name="username"
                onChange={_handleUsername}
              />
              <input
                placeholder="password"
                name="password"
                type="password"
                onChange={_handlePassword}
              />
              <input type="submit" value="login" />
            </form>
          </div>
        </If>
      </>
    );
};

export default Login;
