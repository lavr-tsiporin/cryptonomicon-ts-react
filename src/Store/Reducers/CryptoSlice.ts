import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICrypto } from "../../Models/ICrypto";
import { LOCALSTORAGE_KEY } from "../../Constants";

interface CryptoState {
  cryptos: ICrypto[];
}

const initialState: CryptoState = {
  cryptos: JSON.parse(<string>localStorage.getItem(LOCALSTORAGE_KEY)) || [],
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    addCrypto(state, action: PayloadAction<ICrypto>) {
      state.cryptos.push(action.payload);
    },
    removeCrypto(state, action: PayloadAction<string>) {
      state.cryptos.splice(
        state.cryptos.findIndex((el) => el.nameCrypto === action.payload),
        1
      );
    },
  },
});

export default cryptoSlice.reducer;
