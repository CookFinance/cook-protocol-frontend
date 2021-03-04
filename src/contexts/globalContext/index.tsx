import { UniswapModal } from "components";
import { useConnectedWeb3Context } from "contexts/connectedWeb3";
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
    usdt: ZERO_NUMBER,
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
    usdt: ZERO_NUMBER,
  },
};

const GlobalContext = React.createContext<
  IGlobalData & {
    addFund: (_: ICreateFund) => void;
    setUniswapModalVisible: (_: boolean) => void;
  }
>({
  createdPools: [],
  tokenPrices: defaultCoinPrices,
  addFund: (_: ICreateFund) => {},
  ethBalance: ZERO_NUMBER,
  uniswapModalVisible: false,
  setUniswapModalVisible: (_: boolean) => {},
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
    ethBalance: ZERO_NUMBER,
    uniswapModalVisible: false,
  });
  const { account, library: provider } = useConnectedWeb3Context();

  const addFund = (payload: ICreateFund) => {
    setState((prev) => ({
      ...prev,
      createdPools: [...prev.createdPools, payload],
    }));
  };

  const setUniswapModalVisible = (uniswapModalVisible: boolean) => {
    setState((prev) => ({
      ...prev,
      uniswapModalVisible,
    }));
  };

  useEffect(() => {
    const loadCoinPrices = async () => {
      const prices = await getCoinsPrices();
      setState((prev) => ({ ...prev, tokenPrices: prices }));
    };
    loadCoinPrices();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadEthBalance = async () => {
      setState((prev) => ({ ...prev, ethBalance: ZERO_NUMBER }));
      if (provider) {
        const balance = await provider.getBalance(account || "");
        if (isMounted) {
          setState((prev) => ({ ...prev, ethBalance: balance }));
        }
      }
    };

    loadEthBalance();

    return () => {
      isMounted = false;
    };
  }, [provider]);

  return (
    <GlobalContext.Provider
      value={{ ...state, addFund, setUniswapModalVisible }}
    >
      {props.children}
      {state.uniswapModalVisible && (
        <UniswapModal
          onClose={() => setUniswapModalVisible(false)}
          visible={state.uniswapModalVisible}
        />
      )}
    </GlobalContext.Provider>
  );
};
