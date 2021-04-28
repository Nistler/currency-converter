import React from "react";
import "../styles/App.css";
import "../styles/currency-flags.css";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { convertation, validation } from "../utils/calculations";
import { twoDigits } from "../utils/normalization";
import Select from "react-select";
import { allSelectOptions } from "../constants/select-options";
import swapIcon from "../media/Swap.svg";
import SingleRate from "./SingleRate";
import { getCurrency } from "../services/ratesAPI";

const mapStateToProps = (state) => {
  return {
    inputs: state.inputs,
    currencies: state.currencies,
    ui: state.ui,
  };
};

const actionCreators = {
  updateQuickConvert: actions.updateQuickConvert,
  addBaseCurrency: actions.addBaseCurrency,
  updateMainCurrency: actions.updateMainCurrency,
  updateTargetCurrency: actions.updateTargetCurrency,
  updateAmount: actions.updateAmount,
  executeConvertation: actions.executeConvertation,
  reverseCurrencies: actions.reverseCurrencies,
  removeFavorite: actions.removeFavorite,
  quickFormValid: actions.quickFormValid,
  quickFormInvalid: actions.quickFormInvalid,
};

const Converter = ({
  inputs,
  currencies: { baseCurrency, favorites },
  ui,
  updateQuickConvert,
  addBaseCurrency,
  updateMainCurrency,
  updateTargetCurrency,
  updateAmount,
  executeConvertation,
  reverseCurrencies,
  removeFavorite,
  quickFormValid,
  quickFormInvalid,
}) => {
  const handleRemoveFavorites = ({ target }) => {
    removeFavorite({ label: target.id });
  };

  const setNewTargetCurrency = ({ target }) =>
    updateTargetCurrency({ targetCurrency: target.id });

  const renderRates = (rates) => {
    const entries = Object.entries(rates);
    const mainCurrencies = entries.filter(([currency]) =>
      favorites.includes(currency)
    );

    const mapping = (currencies) =>
      currencies.map(([currency, rate]) => (
        <SingleRate
          key={currency}
          id={currency}
          currency={currency}
          rate={rate}
          favorite={true}
          setNewTargetCurrency={setNewTargetCurrency}
          favoriteAction={handleRemoveFavorites}
        />
      ));

    return <div>{mapping(mainCurrencies)}</div>;
  };

  const customLabel = (value, label) => (
    <div>
      <span className={`currency-flag currency-flag-${value.toLowerCase()}`} />
      <span> {label}</span>
    </div>
  );

  const customValue = (currency) => {
    if (!currency) {
      return;
    }
    return (
      <div className="ps-1">
        <span
          className={`currency-flag currency-flag-${currency.toLowerCase()}`}
        />
        <span> {currency}</span>
      </div>
    );
  };

  const handleQuickInput = ({ target }) => {
    updateQuickConvert({ text: target.value });
  };

  const handleQuickForm = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const data = inputs.text.split(" ");
    if (!validation(data)) {
      quickFormInvalid();
      return;
    }
    quickFormValid();
    const amount = data[0];
    const mainCurrency = data[1].toUpperCase();
    const targetCurrency = data[3].toUpperCase();
    updateAmount({ amount });
    const { conversion_rates } = await handleUpdateMainCurrency({
      value: mainCurrency,
    });
    updateTargetCurrency({ targetCurrency });
    const convertationResult = twoDigits(
      convertation(amount, conversion_rates[targetCurrency])
    );
    executeConvertation({ convertationResult });
  };

  const handleUpdateMainCurrency = async ({ value }) => {
    updateMainCurrency({ mainCurrency: value });
    const newBaseCurrency = await getCurrency(value); // !! Запрос работает !!
    //const newBaseCurrency = labels[value.toLowerCase()];
    addBaseCurrency({ baseCurrency: newBaseCurrency });
    localStorage.setItem("baseCurrency", JSON.stringify(value));
    return newBaseCurrency;
  };

  const handleUpdateAmount = ({ target }) => {
    const points = target.value
      .split("")
      .reduce((counter, char) => (char === "." ? counter + 1 : counter), 0);
    if (!target.value.match(/^\d*\.?\d*$/) || points > 1) {
      return;
    }
    updateAmount({ amount: target.value });
  };

  const handleUpdateTargetCurrency = ({ value }) => {
    updateTargetCurrency({ targetCurrency: value });
  };

  const handleConvert = (e) => {
    e.preventDefault();
    const targetCurrency = inputs.targetCurrency;
    const rate = baseCurrency.conversion_rates[targetCurrency];
    const convertationResult = twoDigits(convertation(inputs.amount, rate));
    executeConvertation({ convertationResult });
  };

  const handleReverse = () => reverseCurrencies();

  const selectOptions = [
    ...allSelectOptions.map(({ value, label }) => {
      return {
        value,
        label: customLabel(value, label),
      };
    }),
  ];

  return (
    <section className="content">
      <div className="row justify-content-md-center">
        <div className="col col-lg-9">
          <div className="card text-dark bg-light">
            <div className="card-body">
              {/* quick convertation form */}
              <div className="row">
                <form onSubmit={handleQuickForm}>
                  <div className="row justify-content-md-center align-items-center">
                    <div className="col-auto">
                      <label
                        title="Enter the amount of base currency and currency to convert"
                        htmlFor="exchange"
                      >
                        Quick convertation
                      </label>
                    </div>
                    <div className="col-sm">
                      <input
                        id="exchange"
                        type="text"
                        className="input form-control my-2"
                        required
                        value={inputs.text}
                        onChange={handleQuickInput}
                        placeholder="1 EUR in USD"
                      />
                    </div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      {ui.quickForm === "invalid" ? (
                        "Please, enter valid request"
                      ) : (
                        <div>&nbsp;</div>
                      )}
                    </div>
                    <div className="col-auto">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Convert"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <hr />
              {/* convertation form */}
              <div className="row">
                <form onSubmit={handleConvert}>
                  <div className="row align-items-end justify-content-center">
                    <div className="col-md">
                      <label title="Enter the amount" htmlFor="amount">
                        Amount
                      </label>
                      <input
                        id="amount"
                        type="text"
                        className="input form-control my-2"
                        required
                        inputMode="decimal"
                        value={inputs.amount}
                        placeholder="1.00"
                        onChange={handleUpdateAmount}
                      />
                    </div>
                    <div className="col-md">
                      <label
                        title="Choose base currency"
                        htmlFor="fromCurrency"
                      >
                        Base currency
                      </label>
                      <input
                        className="input-required"
                        type="text"
                        value={inputs.mainCurrency}
                        tabIndex={-1}
                        autoComplete="off"
                        required={true}
                        onChange={handleUpdateMainCurrency}
                      />
                      <Select
                        options={selectOptions}
                        className="my-2"
                        required={true}
                        value={{
                          value: inputs.mainCurrency,
                          label: customValue(inputs.mainCurrency),
                        }}
                        onChange={handleUpdateMainCurrency}
                      />
                    </div>

                    <div className="col-auto">
                      <button
                        className="reverse-btn btn btn-primary my-2 rounded-circle swap-btn"
                        onClick={handleReverse}
                      >
                        <img
                          src={swapIcon}
                          width="30px"
                          height="30px"
                          alt="Swap symbol"
                        />
                      </button>
                    </div>

                    <div className="col-md">
                      <label
                        title="Choose target currency"
                        htmlFor="targetCurrency"
                      >
                        Target currency
                      </label>
                      <input
                        className="input-required"
                        type="text"
                        value={inputs.targetCurrency}
                        tabIndex={-1}
                        autoComplete="off"
                        required={true}
                        onChange={handleUpdateTargetCurrency}
                      />
                      <Select
                        options={selectOptions}
                        required={true}
                        className="my-2"
                        value={{
                          value: inputs.targetCurrency,
                          label: customValue(inputs.targetCurrency),
                        }}
                        onChange={handleUpdateTargetCurrency}
                      />
                    </div>
                  </div>
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      {inputs.convertationResult ? (
                        inputs.convertationResult
                      ) : (
                        <div>&nbsp;</div>
                      )}
                    </div>
                    <div className="col-auto">
                      <input
                        type="submit"
                        value="Convert"
                        className="btn btn-primary"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col col-lg-9 my-5">
          {/* rates */}
          <div className="card text-dark bg-light">
            <div className="card-body">
              <p className="h5 card-title text-center">Favorites</p>
              <div className="row">
                <div className="col">Currency</div>
                <div className="col col-sm-3">
                  <div className="text-center">Rate</div>
                </div>
                <div className="col col-sm-3">
                  <div className="text-end">Favorite</div>
                </div>
              </div>
              {renderRates(baseCurrency.conversion_rates)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(mapStateToProps, actionCreators)(Converter);
