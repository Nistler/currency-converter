import { currencies } from "../constants/currencies";

export const convertation = (amount = 1, rate = 1) => amount * rate;

export const validation = ([amount, baseCurrency, iN, targetCurrency]) => {
  if (!amount || !baseCurrency || !iN || !targetCurrency) {
    return false;
  }

  const value = !!parseInt(amount, 10);
  const currency1 = currencies.includes(baseCurrency.toUpperCase());
  const knot = iN.toUpperCase() === "IN";
  const currency2 = currencies.includes(targetCurrency.toUpperCase());

  return value && currency1 && knot && currency2;
};
