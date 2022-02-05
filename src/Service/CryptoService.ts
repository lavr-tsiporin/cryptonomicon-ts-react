import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { DISPLAY_DOT_AFTER_COMMA } from "../Constants";

interface fetchPrice {
  USD: number | string;
}

const formatPrice = (price: string | number): string => {
  return Number(price) > 1
    ? Number(price).toFixed(DISPLAY_DOT_AFTER_COMMA)
    : Number(price).toPrecision(DISPLAY_DOT_AFTER_COMMA);
};

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://min-api.cryptocompare.com`,
  }),
  endpoints: (build) => ({
    fetchPriceCrypto: build.query<fetchPrice, string>({
      query: (nameCrypto = "DOGE") => ({
        url: "/data/price",
        params: {
          fsym: nameCrypto,
          tsyms: "USD",
          api_key: process.env.REACT_APP_API_KEY,
        },
      }),
      transformResponse: (response: fetchPrice, meta, arg) => ({
        USD: formatPrice(response.USD),
      }),
    }),
  }),
});
