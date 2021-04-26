import React from "react";
import { connect } from "react-redux";
import SingleRate from "./SingleRate";
import * as actions from "../actions/index";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  };
};

const actionCreators = {
  addFavorite: actions.addFavorite,
  updateTargetCurrency: actions.updateTargetCurrency,
};

const Rates = ({
  currencies: { baseCurrency, favorites },
  addFavorite,
  updateTargetCurrency,
}) => {
  const handleAddFavorites = ({ target }) => addFavorite({ label: target.id });

  const setNewTargetCurrency = ({ target }) =>
    updateTargetCurrency({ targetCurrency: target.id });

  const renderRates = (rates) => {
    const entries = Object.entries(rates);
    const mapping = (currencies) =>
      currencies.map(([currency, rate]) => (
        <SingleRate
          key={currency}
          currency={currency}
          rate={rate}
          id={currency}
          favorite={false}
          favorites={favorites}
          setNewTargetCurrency={setNewTargetCurrency}
          favoriteAction={handleAddFavorites}
        />
      ));

    return <div>{mapping(entries)}</div>;
  };

  return (
    <>
      <h1>Rates</h1>
      {baseCurrency.conversion_rates &&
        renderRates(baseCurrency.conversion_rates)}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(Rates);
