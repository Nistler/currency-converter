import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  };
};

const actionCreators = {};

const Rates = ({ currencies: { baseCurrency } }) => {
  const renderRates = (rates) => {
    const entries = Object.entries(rates);
    const mapping = (currencies) =>
      currencies.map(([currency, rate]) => (
        <div key={currency}>
          {currency}: {rate}
        </div>
      ));

    return <div>{mapping(entries)}</div>;
  };

  return (
    <>
      <h1>Rates</h1> {renderRates(baseCurrency.conversion_rates)}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(Rates);
