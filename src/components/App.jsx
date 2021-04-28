import React, { useEffect } from "react";
import Converter from "./Converter";
import Rates from "./Rates";
import "../styles/App.css";
import Nav from "./Nav";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom"; // решение для gh-pages
// import * as data from "../__fixtures__/data"; // отладочное решение
import { defaultFavoriteCurrencies } from "../constants/main-currencies";
import * as actions from "../actions";
import { connect } from "react-redux";
import Header from "./Header";
import BackgroundVideo from "./BgVideo";
import Footer from "./Footer";
import { getCurrency } from "../services/ratesAPI";

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
    async function request() {
      let localStorageFavorites = JSON.parse(localStorage.getItem("favorites"));
      const usersFavorites = localStorageFavorites ?? defaultFavoriteCurrencies;
      let localStorageBaseCurrency = JSON.parse(
        localStorage.getItem("baseCurrency")
      );
      const userBaseCurrency = localStorageBaseCurrency ?? "EUR";
      //const baseData = userBaseCurrency === "EUR" ? data.eur : data.usd; // отладочное решение
      const baseData = await getCurrency(userBaseCurrency);
      addBaseCurrency({ baseCurrency: baseData });
      setFavorites({ favorites: usersFavorites });
      updateMainCurrency({ mainCurrency: userBaseCurrency });
    }
    request();
  }, [addBaseCurrency, setFavorites, updateMainCurrency]);

  return (
    <Router basename="/">
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
