// import { func } from "prop-types";
import React, { Component } from "react";
// import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default class NestedRouter extends Component {
  // constructor(props){
  //     super(props);
  // }
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topic">Topic</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/topic" component={Topics} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function About() {
  return <h1>About us</h1>;
}

function Home() {
  return <h1>Welcome Home</h1>;
}

function Topics() {
  let match = useRouteMatch();
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h2>Requested topic ID: {topicId}</h2>;
}
