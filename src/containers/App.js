import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import asyncComponent from "../utils/AsyncComponent";
import connectRoute from "../utils/connectRoute";

const AsyncHome=connectRoute(asyncComponent(()=>import("./Home")));

class App extends Component {


  render() {
    return (
      <Router>
        <Switch>
          <Route path={"/"} exact component={AsyncHome}/>
        </Switch>
      </Router>
    )
  }
}

export default App;