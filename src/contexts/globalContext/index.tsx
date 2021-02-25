import React, { useEffect, useState } from "react";
import { ICreateFund, IGlobalData, Maybe } from "types";

const GlobalContext = React.createContext<
  IGlobalData & {
    addFund: (_: ICreateFund) => void;
  }
>({
  createdPools: [],
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
  });

  const addFund = (payload: ICreateFund) => {
    setState((prev) => ({
      ...prev,
      createdPools: [...prev.createdPools, payload],
    }));
  };

  return (
    <GlobalContext.Provider value={{ ...state, addFund }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
