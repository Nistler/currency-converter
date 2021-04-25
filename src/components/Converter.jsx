import React from "react";
import "../styles/Converter.css";
import { timeStampToTime, twoDigits } from "../utils/normalization";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import { defaultFavoriteCurrencies } from "../constants/main-currencies";
import { convertation, validation } from "../utils/calculations";
import Select from "react-select";
import { allSelectOptions } from "../constants/select-options";

//import { getCurrency } from "../services/ratesAPI";

const mapStateToProps = (state) => {
  return {
    inputs: state.inputs,
    currencies: state.currencies,
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
};

const Converter = ({
  inputs,
  currencies: { baseCurrency },
  updateQuickConvert,
  addBaseCurrency,
  updateMainCurrency,
  updateTargetCurrency,
  updateAmount,
  executeConvertation,
  reverseCurrencies,
}) => {
  const renderRates = (rates) => {
    const entries = Object.entries(rates);
    const mainCurrencies = entries.filter(([currency]) =>
      defaultFavoriteCurrencies.includes(currency)
    );

    const mapping = (currencies) =>
      currencies.map(([currency, rate]) => (
        <div key={currency}>
          {currency}: {rate}
        </div>
      ));

    return (
      <>
        <hr />
        <div>{mapping(mainCurrencies)}</div>
      </>
    );
  };

  const handleQuickInput = ({ target }) => {
    updateQuickConvert({ text: target.value });
  };

  const handleQuickForm = (e) => {
    e.preventDefault();
    const data = inputs.text.split(" ");
    if (validation(data)) {
      updateAmount({ amount: data[0] });
      updateMainCurrency({ mainCurrency: data[1].toUpperCase() }); // необходим запрос
      updateTargetCurrency({ targetCurrency: data[3].toUpperCase() });
    }
  };

  const handleUpdateMainCurrency = async ({ value }) => {
    updateMainCurrency({ mainCurrency: value });
    // !! Запрос работает !!
    //const newBaseCurrency = await getCurrency(value);
    //addBaseCurrency({ baseCurrency: newBaseCurrency });
  };

  const handleUpdateAmount = (e) => {
    updateAmount({ amount: e.target.value });
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

  return (
    <>
      <h1>{baseCurrency.base_code}</h1>
      <h2>{baseCurrency.time_last_update_utc}</h2>
      <h3>{timeStampToTime(baseCurrency.time_last_update_unix)}</h3>
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
      <div>&nbsp;</div>
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
            options={allSelectOptions}
            required={true}
            value={{
              value: inputs.mainCurrency,
              label: inputs.mainCurrency,
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
            options={allSelectOptions}
            required={true}
            value={{
              value: inputs.targetCurrency,
              label: inputs.targetCurrency,
            }}
            onChange={handleUpdateTargetCurrency}
          />
        </div>
        <div className="convertation-fields">
          <div>&nbsp;</div>
          <input type="submit" value="Convert" />
        </div>
      </form>
      {inputs.convertationResult}
      {/* rates */}
      {renderRates(baseCurrency.conversion_rates)}
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(Converter);
