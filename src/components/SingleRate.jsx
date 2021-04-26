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
  const classes = `currency-flag currency-flag-${currency.toLowerCase()}`;
  const disabled = favorites && favorites.includes(currency);
  const action = favorite ? "Remove from favorites" : "Add to favorites";
  return (
    <div>
      <Link to="/">
        <button id={id} onClick={setNewTargetCurrency}>
          <span className={classes} />
          {countryByLabel[currency]}: {rate}{" "}
        </button>
      </Link>

      <button disabled={disabled} id={id} onClick={favoriteAction}>
        {action}
      </button>
    </div>
  );
};

export default SingleRate;
