import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./component/Dashboard/Dashboard";
import SignIn from "./component/SignIn/SignIn";
import { SignUp } from "./component/SignUp/SignUp";
import Privacy from "./component/Privacy/Privacy";
import { AuthProvider } from "./component/Authentication/Authentication";
import "./App.css";
import DocumentViewer from "./component/DocumentViewer/DocumentViewer";
import ImageViewer from "./component/ImageViewer/ImageViewer";
import AudioViewer from "./component/AudioViewer/AudioViewer";
import VideoViewer from "./component/VideoViewer/VideoViewer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/documentviewer" component={DocumentViewer} />
          <Route exact path="/imageviewer" component={ImageViewer} />
          <Route exact path="/audioviewer" component={AudioViewer} />
          <Route exact path="/videoviewer" component={VideoViewer} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
