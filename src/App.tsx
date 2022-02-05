import React from "react";
import { InputAddCrypto } from "./Components/InputAddCrypto/InputAddCrypto";
import { CryptoGraph } from "./Components/CryptoGraph/CryptoGraph";
import { CryptoList } from "./Components/CryptoList/CryptoList";

const App = () => {
  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        <div className="w-full my-4" />
        <InputAddCrypto />
        <hr className="w-full border-t border-gray-600 my-4" />
        <CryptoList />
        <hr className="w-full border-t border-gray-600 my-4" />
        <CryptoGraph />
      </div>
    </div>
  );
};

export default App;
