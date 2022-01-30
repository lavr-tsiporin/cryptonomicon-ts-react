import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface fetchPrice {
  USD: number;
}

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
    }),
  }),
});
