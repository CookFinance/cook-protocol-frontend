import React, { useEffect, useState } from "react";
import { ICreateLiquidityPool, IGlobalData, Maybe } from "types";

const GlobalContext = React.createContext<
  IGlobalData & {
    addPool: (_: ICreateLiquidityPool) => void;
  }
>({
  createdPools: [],
  addPool: (_: ICreateLiquidityPool) => {},
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
  });

  const addPool = (payload: ICreateLiquidityPool) => {
    setState((prev) => ({
      ...prev,
      createdPools: [...prev.createdPools, payload],
    }));
  };

  return (
    <GlobalContext.Provider value={{ ...state, addPool }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
