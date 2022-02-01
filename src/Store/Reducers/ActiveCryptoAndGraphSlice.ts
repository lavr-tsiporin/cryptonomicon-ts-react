import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGraph } from "../../Models/IGraph";
import { cryptoApi } from "../../Service/CryptoService";

const initialState: IGraph = {
  active: false,
  nameGraph: "",
  prices: [],
};

export const activeCryptoAndGraphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNameGraphAndActive(
      state,
      action: PayloadAction<Pick<IGraph, "active" | "nameGraph">>
    ) {
      if (state.nameGraph !== action.payload.nameGraph) {
        state.prices = [];
      }
      state.nameGraph = action.payload.nameGraph;
      state.active = true;
    },
    removeNameGraphAndActive() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cryptoApi.endpoints.fetchPriceCrypto.matchFulfilled,
      (state, action) => {
        if (state.active && action.meta.arg.originalArgs === state.nameGraph) {
          state.prices.push(...Object.values(action.payload));
        }
      }
    );
  },
});

export default activeCryptoAndGraphSlice.reducer;
