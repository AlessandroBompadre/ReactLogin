import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import Redux from './components/Redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function MenuLink({ label, to, activeOnlyWhenExact }) {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => (
        <div className={match ? "active" : ""}>
          {match ? "> " : ""}
          <Link to={to}>{label}</Link>
        </div>
      )}
    />
  );
}

ReactDOM.render(
    <Router>
      <div>
        <MenuLink activeOnlyWhenExact={true} to="/" label="Login" />
        <MenuLink to="/redux" label="Login with Redux" />
        <hr />
        <Route exact path="/" component={App} />
        <Route path="/redux" component={Redux} />
      </div>
    </Router>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
