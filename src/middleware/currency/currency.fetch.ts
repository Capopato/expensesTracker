import axios from "axios";
import config from "../../config/config";

export const convertCurrency = async (from: string, to: string, amount: number) => {
  const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;

  try {
    const response = await axios.get(url, config.header);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const latestRate = async (from: string, to: string) => {
  const url = `https://api.apilayer.com/exchangerates_data/latest?symbols=${to}&base=${from}`;

  try {
    const response = await axios.get(url, config.header);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};
