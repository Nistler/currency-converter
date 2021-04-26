import React from "react";
import { connect } from "react-redux";
import { timeStampToTime } from "../utils/normalization";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  };
};

const actionCreators = {};

const Header = ({ currencies: { baseCurrency } }) => {
  return (
    <>
      <h1>{baseCurrency.base_code}</h1>
      <h2>{baseCurrency.time_last_update_utc}</h2>
      <h3>{timeStampToTime(baseCurrency.time_last_update_unix)}</h3>
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(Header);
