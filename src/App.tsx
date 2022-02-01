import React, { useEffect } from "react";
import { CryptoItem } from "./Components/CryptoItem/CryptoItem";
import { InputAddCrypto } from "./Components/InputAddCrypto/InputAddCrypto";
import { useAppSelector } from "./hooks/redux";
import { LOCALSTORAGE_KEY } from "./Constants";
import { CryptoGraph } from "./Components/CryptoGraph/CryptoGraph";

const App = () => {
  const { cryptos } = useAppSelector((state) => state.cryptoReducer);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cryptos));
  }, [cryptos]);

  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        <div className="w-full my-4" />
        <InputAddCrypto />
        <hr className="w-full border-t border-gray-600 my-4" />
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cryptos.map(({ nameCrypto }) => (
            <CryptoItem nameCrypto={nameCrypto} key={nameCrypto} />
          ))}
        </dl>
        <hr className="w-full border-t border-gray-600 my-4" />
        <CryptoGraph />
      </div>
    </div>
  );
};

export default App;
