import React, { useEffect, useState } from "react";
import { ICoinPrices, ICreateFund, IGlobalData, Maybe } from "types";
import { ZERO_NUMBER } from "utils/number";
import { getCoinsPrices } from "utils/token";

export const defaultCoinPrices: ICoinPrices = {
  current: {
    eth: ZERO_NUMBER,
    link: ZERO_NUMBER,
    xrp: ZERO_NUMBER,
    ltc: ZERO_NUMBER,
    dot: ZERO_NUMBER,
    uni: ZERO_NUMBER,
    comp: ZERO_NUMBER,
    bal: ZERO_NUMBER,
    yfi: ZERO_NUMBER,
    rep: ZERO_NUMBER,
    dai: ZERO_NUMBER,
    xlm: ZERO_NUMBER,
    zrx: ZERO_NUMBER,
  },
  prev: {
    eth: ZERO_NUMBER,
    link: ZERO_NUMBER,
    xrp: ZERO_NUMBER,
    ltc: ZERO_NUMBER,
    dot: ZERO_NUMBER,
    uni: ZERO_NUMBER,
    comp: ZERO_NUMBER,
    bal: ZERO_NUMBER,
    yfi: ZERO_NUMBER,
    rep: ZERO_NUMBER,
    dai: ZERO_NUMBER,
    xlm: ZERO_NUMBER,
    zrx: ZERO_NUMBER,
  },
};

const GlobalContext = React.createContext<
  IGlobalData & {
    addFund: (_: ICreateFund) => void;
  }
>({
  createdPools: [],
  tokenPrices: defaultCoinPrices,
  addFund: (_: ICreateFund) => {},
});

export const useGlobal = () => {
  const context = React.useContext(GlobalContext);

  if (!context) {
    throw new Error("Component rendered outside the provider tree");
  }

  return context;
};

export const GlobalProvider: React.FC = (props) => {
  const [state, setState] = useState<IGlobalData>({
    createdPools: [],
    tokenPrices: defaultCoinPrices,
  });

  const addFund = (payload: ICreateFund) => {
    setState((prev) => ({
      ...prev,
      createdPools: [...prev.createdPools, payload],
    }));
  };

  useEffect(() => {
    const loadCoinPrices = async () => {
      const prices = await getCoinsPrices();
      setState((prev) => ({ ...prev, tokenPrices: prices }));
    };
    loadCoinPrices();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, addFund }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
