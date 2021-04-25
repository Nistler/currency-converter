import { handleActions } from "redux-actions";
import { combineReducers } from "@reduxjs/toolkit";
import * as actions from "../actions/index";

const inputs = handleActions(
  {
    [actions.updateQuickConvert](state, { payload: { text } }) {
      return { ...state, text };
    },
    [actions.updateMainCurrency](state, { payload: { mainCurrency } }) {
      return { ...state, mainCurrency };
    },
    [actions.updateTargetCurrency](state, { payload: { targetCurrency } }) {
      return { ...state, targetCurrency };
    },
    [actions.updateAmount](state, { payload: { amount } }) {
      return { ...state, amount };
    },
    [actions.reverseCurrencies](state) {
      const { mainCurrency, targetCurrency } = state;
      return {
        ...state,
        mainCurrency: targetCurrency,
        targetCurrency: mainCurrency,
      };
    },
    [actions.executeConvertation](state, { payload: { convertationResult } }) {
      return { ...state, convertationResult };
    },
  },
  {
    text: "",
    targetCurrency: "",
    amount: "",
    mainCurrency: "",
    convertationResult: 0,
  }
);

const currencies = handleActions(
  {
    [actions.addBaseCurrency](state, { payload: { baseCurrency } }) {
      return { ...state, baseCurrency };
    },
  },
  {
    baseCurrency: {
      time_last_update_unix: 1619168344,
      base_code: "USD",
      time_last_update_utc: "2021-04-24",
      conversion_rates: [],
    },
  }
);

export default combineReducers({ inputs, currencies });
