import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import Books from "./components/Books"




class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
          </Switch>
        </div>
      </Router>

      

    );
  }
}




export default App;
