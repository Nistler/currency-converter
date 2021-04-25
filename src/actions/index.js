import { createAction } from "redux-actions";

export const addBaseCurrency = createAction("BASE_CURRENCY_ADD");

export const updateQuickConvert = createAction("INPUT_QUICK_UPDATE");

export const updateMainCurrency = createAction("INPUT_MAIN_CURRENCY_UPDATE");

export const updateTargetCurrency = createAction(
  "INPUT_TARGET_CURRENCY_UPDATE"
);

export const updateAmount = createAction("INPUT_AMOUNT_UPDATE");

export const executeConvertation = createAction("CONVERTATION");

export const reverseCurrencies = createAction("REVERSE_CURRENCIES");
