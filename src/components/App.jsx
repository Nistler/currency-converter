import React, { useEffect } from "react";
import Converter from "./Converter";
import Rates from "./Rates";
import "../styles/App.css";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as data from "../__fixtures__/data";
import { defaultFavoriteCurrencies } from "../constants/main-currencies";
import * as actions from "../actions";
import { connect } from "react-redux";
import Header from "./Header";
import BackgroundVideo from "./BgVideo";
import Footer from "./Footer";

const mapStateToProps = (state) => {
  return {
    inputs: state.inputs,
    currencies: state.currencies,
  };
};

const actionCreators = {
  addBaseCurrency: actions.addBaseCurrency,
  setFavorites: actions.setFavorites,
  updateMainCurrency: actions.updateMainCurrency,
};

const App = ({ addBaseCurrency, setFavorites, updateMainCurrency }) => {
  useEffect(() => {
    // Должен быть запрос, основанный на состоянии из браузера
    const usersFavorites = localStorage.getItem("favorites") ?? [
      ...defaultFavoriteCurrencies,
    ];
    const userBaseCurrency = localStorage.getItem("baseCurrency") ?? "EUR";

    console.log(userBaseCurrency);

    addBaseCurrency({ baseCurrency: data.eur });
    setFavorites({ favorites: usersFavorites });
    updateMainCurrency({ mainCurrency: "EUR" });
  }, [addBaseCurrency, setFavorites, updateMainCurrency]);

  return (
    <Router>
      <BackgroundVideo />
      <Nav />
      <main className="container-md">
        <Header />
        <Switch>
          <Route path="/" exact component={Converter} />
          <Route path="/Rates" component={Rates} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
