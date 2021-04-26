import React from "react";
import "../styles/Converter.css";
import "../styles/currency-flags.css";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { convertation, validation } from "../utils/calculations";
import { twoDigits } from "../utils/normalization";
import Select from "react-select";
import { allSelectOptions } from "../constants/select-options";
import * as labels from "../__fixtures__/data";
import SingleRate from "./SingleRate"; // удалить!!
//import { getCurrency } from "../services/ratesAPI";

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
  const handleRemoveFavorites = ({ target }) =>
    removeFavorite({ label: target.id });

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

    return (
      <>
        <hr />
        <div>{mapping(mainCurrencies)}</div>
      </>
    );
  };

  const customLabel = (value, label) => (
    <div>
      <span className={`currency-flag currency-flag-${value.toLowerCase()}`} />
      <span>{label}</span>
    </div>
  );

  const customValue = (currency) => {
    if (!currency) {
      return;
    }
    const index = allSelectOptions.findIndex(({ value }) => value === currency);
    return (
      <div>
        <span
          className={`currency-flag currency-flag-${currency.toLowerCase()}`}
        />
        <span>{allSelectOptions[index].label}</span>
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
    //const newBaseCurrency = await getCurrency(value); // !! Запрос работает !!
    const newBaseCurrency = labels[value.toLowerCase()];
    addBaseCurrency({ baseCurrency: newBaseCurrency });
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
    <>
      {/* quick convertation form */}
      <form className="quick-convert-form" onSubmit={handleQuickForm}>
        <label
          title="Enter the amount of base currency and currency to convert"
          htmlFor="exchange"
        >
          Quick convertation
        </label>
        <input
          id="exchange"
          type="text"
          className={"input"}
          required
          value={inputs.text}
          onChange={handleQuickInput}
          placeholder="1 EUR in USD"
        />
        <input type="submit" value="Convert" />
      </form>
      {ui.quickForm === "invalid" ? "Enter valid request" : <div>&nbsp;</div>}

      {/* convertation form */}
      <form className="convertation-form" onSubmit={handleConvert}>
        <div className="convertation-fields">
          <label title="Enter the amount" htmlFor="amount">
            Amount
          </label>
          <input
            id="amount"
            type="text"
            className={"input"}
            required
            inputMode="decimal"
            value={inputs.amount}
            placeholder="1.00"
            onChange={handleUpdateAmount}
          />
        </div>

        <div className="convertation-fields">
          <label title="Choose base currency" htmlFor="fromCurrency">
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
            required={true}
            value={{
              value: inputs.mainCurrency,
              label: customValue(inputs.mainCurrency),
            }}
            onChange={handleUpdateMainCurrency}
          />
        </div>

        <div className="convertation-fields">
          <div>&nbsp;</div>
          <button className="reverse-btn" onClick={handleReverse}>
            {"<->"}
          </button>
        </div>

        <div className="convertation-fields">
          <label title="Choose target currency" htmlFor="targetCurrency">
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
            value={{
              value: inputs.targetCurrency,
              label: customValue(inputs.targetCurrency),
            }}
            onChange={handleUpdateTargetCurrency}
          />
        </div>
        <div className="convertation-fields">
          <div>&nbsp;</div>
          <input type="submit" value="Convert" />
        </div>
      </form>
      {inputs.convertationResult ? (
        inputs.convertationResult
      ) : (
        <div>&nbsp;</div>
      )}
      {/* rates */}
      {renderRates(baseCurrency.conversion_rates)}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(Converter);
