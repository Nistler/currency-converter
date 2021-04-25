import React, { useEffect } from "react";
import Converter from "./Converter";
import Rates from "./Rates";
import "../styles/Converter.css";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as data from "../__fixtures__/data";
import * as actions from "../actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    inputs: state.inputs,
    currencies: state.currencies,
  };
};

const actionCreators = {
  addBaseCurrency: actions.addBaseCurrency,
};

const App = ({ addBaseCurrency }) => {
  useEffect(() => {
    addBaseCurrency({ baseCurrency: data.usd });
  }, [addBaseCurrency]);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Converter} />
        <Route path="/Rates" component={Rates} />
      </Switch>
    </Router>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
