import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface fetchPrice {
  USD: number | string;
}

const formatPrice = (price: string | number): string => {
  return Number(price) > 1
    ? Number(price).toFixed(4)
    : Number(price).toPrecision(4);
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
