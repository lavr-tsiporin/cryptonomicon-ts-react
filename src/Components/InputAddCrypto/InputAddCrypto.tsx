import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { cryptoSlice } from "../../Store/Reducers/CryptoSlice";
import { ICrypto } from "../../Models/ICrypto";

export const InputAddCrypto = () => {
  const allTickers = useRef<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [alreadyAddTickers, setAlreadyAddTickers] = useState<boolean>(false);
  const { cryptos } = useAppSelector((state) => state.cryptoReducer);
  const { addCrypto } = cryptoSlice.actions;
  const dispatch = useAppDispatch();

  async function fetchAllTickers() {
    try {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
      );
      const keysTickers = Object.keys(response.data.Data).sort();
      allTickers.current = keysTickers;
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    fetchAllTickers();
  }, []);

  const handlerAddCrypto = (value: string) => {
    if (cryptos.some((el: ICrypto) => value === el.nameCrypto)) {
      setAlreadyAddTickers(true);
      return;
    }
    dispatch(addCrypto({ nameCrypto: value }));
    setInputValue("");
  };

  const handlerAddCryptoWithKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.code === "Enter") {
      handlerAddCrypto(inputValue);
    }
  };

  const handlerSetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlreadyAddTickers(false);
    setInputValue(e.target.value.toUpperCase());
  };

  return (
    <section>
      <div className="flex">
        <div className="max-w-xs">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="wallet"
          >
            Тикер
          </label>
          <div className="mt-1 relative rounded-md shadow-md">
            <input
              type="text"
              name="wallet"
              id="wallet"
              className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
              value={inputValue.toUpperCase()}
              onChange={(e) => handlerSetInputValue(e)}
              onKeyDown={(e) => handlerAddCryptoWithKeyboard(e)}
            />
          </div>
          {inputValue.length > 0 && (
            <div className="flex bg-white p-1 rounded-md shadow-md flex-wrap">
              {allTickers.current
                .filter((ticker) => {
                  const reg = new RegExp(`^${inputValue}`);
                  return ticker.match(reg);
                })
                .slice(0, 4)
                .map((t) => {
                  return (
                    <button
                      className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
                      key={t}
                      onClick={() => handlerAddCrypto(t)}
                    >
                      {t}
                    </button>
                  );
                })}
            </div>
          )}
          {alreadyAddTickers && (
            <div className="text-sm text-red-600">Такой тикер уже добавлен</div>
          )}
        </div>
      </div>
      <button
        type="button"
        className="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={() => handlerAddCrypto(inputValue)}
        disabled={inputValue.length < 1}
      >
        {/* <!-- Heroicon name: solid/mail --> */}
        <svg
          className="-ml-0.5 mr-2 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#ffffff"
        >
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        Добавить
      </button>
    </section>
  );
};
