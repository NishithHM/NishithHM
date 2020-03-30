import React, { Component } from "react";
import { Route, Switch, withRouter, BrowserRouter } from "react-router-dom";
import { Auth, Courses, VideoPlayer, Admin } from "./pages";
import { Header, Protected } from "./components";
import './App.css'
class App extends Component {
  render() {
    return (
      <div className="App-header">
        <Header {...this.props} />
          <Switch>
            <Route exact path="/" render={() => <Auth {...this.props} />} />
            <Protected {...this.props}>
            <Route exact path="/courses" render={() => <Courses {...this.props} />} />
            <Route exact path="/videos" render={() => <VideoPlayer {...this.props} />} />
            <Route exact path="/admin" render={() => <Admin {...this.props} />} />
            </Protected>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
