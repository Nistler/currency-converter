import React from "react";
import { Link } from "react-router-dom";
import { countryByLabel } from "../constants/country-by-label";
import "../styles/currency-flags.css";

const SingleRate = ({
  currency,
  rate,
  id,
  favoriteAction,
  setNewTargetCurrency,
  favorite,
  favorites = null,
}) => {
  const flagClasses = `currency-flag currency-flag-${currency.toLowerCase()}`;
  const disabled = favorites && favorites.includes(currency);
  const action = favorite ? "-" : "+";
  const actionBtnClasses = favorite
    ? "btn btn-outline-danger btn-remove"
    : "btn btn-outline-success btn-add";
  return (
    <div className="row rate-shadow border text-dark bg-light align-items-center mt-3">
      <div className="col d-grid ps-0">
        <Link
          to="/"
          className="btn btn-outline-primary text-start border-0"
          id={id}
          onClick={setNewTargetCurrency}
        >
          <span className={flagClasses} />
          <span> {currency}</span>
          <span className="full-country-label">
            {" "}
            {countryByLabel[currency]}
          </span>
        </Link>
      </div>
      <div className="col col-sm-3 text-center">{rate}</div>
      <div className="col col-sm-3">
        <div className="text-end">
          <button
            disabled={disabled}
            className={actionBtnClasses}
            id={id}
            onClick={favoriteAction}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleRate;
