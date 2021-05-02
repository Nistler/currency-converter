import React from "react";
import { connect } from "react-redux";
import { countryByLabel } from "../constants/country-by-label";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  };
};

const actionCreators = {};

const Header = ({ currencies: { baseCurrency } }) => {
  const { base_code, time_last_update_utc } = baseCurrency;
  return (
    <header className="header container-md">
      <div className="row justify-content-md-center">
        <div className="col col-lg-9">
          <p className="h2 text-center text-light pb-4">
            Currency converter and exchange rates for 160 currencies!
          </p>
          <p className="h5">
            Base currency:{" "}
            <span className="text-light">
              {base_code} - {countryByLabel[base_code]}
            </span>
          </p>
          <p className="h6">
            Exchange rates on{" "}
            <span className="text-light">
              {time_last_update_utc.slice(0, 25)} UTC
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default connect(mapStateToProps, actionCreators)(Header);
