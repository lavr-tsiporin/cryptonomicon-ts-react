import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { LOCALSTORAGE_KEY, DISPLAY_VIEW_ITEMS_FILTERS } from "../../Constants";
import { CryptoItem } from "../CryptoItem/CryptoItem";

interface PaginationState {
  page: number;
  filter: string;
}

export const CryptoList = () => {
  const { cryptos } = useAppSelector((state) => state.cryptoReducer);
  const [paginationState, setPaginationState] = useState<PaginationState>(
    () => {
      const url = String(window.location);
      const initialState = Object.fromEntries(
        new URL(url).searchParams.entries()
      );
      return {
        page: initialState.page ? Number(initialState.page) : 1,
        filter: initialState.filter ? initialState.filter : "",
      };
    }
  );
  const [nextPage, setNextPage] = useState(true);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(cryptos));

    setPaginationState({ ...paginationState, filter: "" });
  }, [cryptos]);

  const filteredCryptoList = (tickers: typeof cryptos) => {
    const start = (paginationState.page - 1) * DISPLAY_VIEW_ITEMS_FILTERS;
    const end = paginationState.page * DISPLAY_VIEW_ITEMS_FILTERS;
    const filteredCrypto = tickers.filter(({ nameCrypto }) =>
      nameCrypto.includes(paginationState.filter)
    );
    return filteredCrypto.slice(start, end);
  };

  useEffect(() => {
    window.history.pushState(
      null,
      document.title,
      `${window.location.pathname}?filter=${paginationState.filter}&page=${paginationState.page}`
    );
  }, [paginationState]);

  useEffect(() => {
    setPaginationState({ ...paginationState, page: 1 });
  }, [paginationState.filter]);

  useEffect(() => {
    const filteredCrypto = cryptos.filter(({ nameCrypto }) =>
      nameCrypto.includes(paginationState.filter)
    );
    setNextPage(
      filteredCrypto.length > paginationState.page * DISPLAY_VIEW_ITEMS_FILTERS
    );
  }, [paginationState.page, cryptos]);

  return (
    <>
      <div className="inline-flex">
        <label htmlFor="filterCrypto" className="self-center">
          Фильтр:
          <input
            value={paginationState.filter.toUpperCase()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPaginationState({
                ...paginationState,
                filter: e.target.value.toUpperCase(),
              })
            }
            id="filterCrypto"
          />
        </label>
        {paginationState.page > 1 && (
          <button
            className="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() =>
              setPaginationState({
                ...paginationState,
                page: paginationState.page - 1,
              })
            }
          >
            Назад
          </button>
        )}
        {nextPage && (
          <button
            className="my-4 mx-2 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() =>
              setPaginationState({
                ...paginationState,
                page: paginationState.page + 1,
              })
            }
          >
            Вперед
          </button>
        )}
      </div>
      <hr className="w-full border-t border-gray-600 my-4" />
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {filteredCryptoList(cryptos).map(({ nameCrypto }) => (
          <CryptoItem nameCrypto={nameCrypto} key={nameCrypto} />
        ))}
      </dl>
    </>
  );
};
