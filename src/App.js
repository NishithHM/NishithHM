import React, { Component } from "react";
import { Route, Switch, withRouter, BrowserRouter } from "react-router-dom";
import { Auth, Courses, VideoPlayer } from "./pages";
import { Header } from "./components";
import './App.css'
class App extends Component {
  render() {
     console.log('rendering')
    return (
      <div className="App-header">
        <Header />
          <Switch>
            <Route exact path="/" render={() => <Auth {...this.props} />} />
            <Route exact path="/courses" render={() => <Courses {...this.props} />} />
            <Route exact path="/videos" render={() => <VideoPlayer {...this.props} />} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
