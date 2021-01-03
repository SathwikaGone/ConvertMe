import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ConvertSpeech from "./Components/ConvertSpeech";
import ConvertText from "./Components/ConvertText";
import Header from "./Components/Header";

export default function router() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={ConvertSpeech} />
      <Route exact path="/Speech-Text" component={ConvertText} />
    </Router>
  );
}
