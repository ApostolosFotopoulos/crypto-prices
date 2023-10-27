import fetch from "node-fetch";
import { isPosInt, isNotEmptyArray, isNotEmptyObj, isString } from "../utils/validateData.js";

export const getCoins = async (req, res) => {
  try {
    const { page } = req.params;

    // Validate params
    if (!isPosInt(page)) {
      return res.status(422).json({ errMsg: "Invalid data" });
    }

    // Get data from coingecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${process.env.coingeckoKey}`
    );
    const status = response.status;
    const coins = await response.json();
    // Validate response
    if (coins?.error) {
      return res.status(status).json({ errMsg: coins.error });
    }

    if (!isNotEmptyArray(coins)) {
      return res.status(500).json({ errMsg: "Server error" });
    }

    // Get necessary fields
    const dataToSend = coins.map((coin) => ({
      id: coin.id || null,
      symbol: coin.symbol || null,
      name: coin.name || null,
      currentPrice: coin.current_price || null,
      high24h: coin.high_24h || null,
      low24h: coin.low_24h || null,
      priceChangePercentage24h: coin.price_change_percentage_24h || null,
    }));

    // Send the data
    res.json(dataToSend);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Server error" });
  }
};

export const getCoin = async (req, res) => {
  try {
    const { id } = req.params;

    //Validate params
    if (!isString(id)) {
      return res.status(422).json({ errMsg: "Invalid data" });
    }

    // Get data from coingecko
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_demo_api_key=${process.env.coingeckoKey}`
    );
    const status = response.status;
    const coin = await response.json();

    // Validate response
    if (coin?.error) {
      return res.status(status).json({ errMsg: coin.error });
    }

    if (!isNotEmptyObj(coin)) {
      return res.status(500).json({ errMsg: "Server error" });
    }

    // Get necessary fields
    const dataToSend = {
      currentPrice: coin.market_data?.current_price.usd || null,
      name: coin.name || null,
      description: coin.description?.en || null,
      high24h: coin.market_data?.high_24h.usd || null,
      low24h: coin.market_data?.low_24h.usd || null,
      priceChange24h: coin.market_data?.price_change_percentage_24h_in_currency.usd || null,
      priceChange7d: coin.market_data?.price_change_percentage_7d_in_currency.usd || null,
      priceChange14d: coin.market_data?.price_change_percentage_14d_in_currency.usd || null,
      priceChange30d: coin.market_data?.price_change_percentage_30d_in_currency.usd || null,
      priceChange60d: coin.market_data?.price_change_percentage_60d_in_currency.usd || null,
      priceChange200d: coin.market_data?.price_change_percentage_200d_in_currency.usd || null,
      priceChange1y: coin.market_data?.price_change_percentage_1y_in_currency.usd || null,
    };

    // Send the data
    res.json(dataToSend);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errMsg: "Server error" });
  }
};
