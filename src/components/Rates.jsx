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
  const handleAddFavorites = ({ target }) => {
    addFavorite({ label: target.id });
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

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
    <section>
      <div className="row justify-content-md-center">
        <div className="col col-lg-8">
          <div className="card text-dark bg-light">
            <div className="card-body">
              <p className="h1">All exchange rates:</p>
              <div className="row ">
                <div className="col-6">Currency</div>
                <div className="col-3">Rate</div>
                <div className="col-3">
                  <div className="text-end"> Favorite</div>
                </div>
              </div>
              {baseCurrency.conversion_rates &&
                renderRates(baseCurrency.conversion_rates)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(mapStateToProps, actionCreators)(Rates);
