import axios from "axios";

const apiKey = "10a3a5857b7fc9e88184a057";

const requestUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

export const getCurrency = async (label) => {
  try {
    return await axios.get(`${requestUrl}/${label}`).then(({ data }) => data);
  } catch (e) {
    throw e;
  }
};
