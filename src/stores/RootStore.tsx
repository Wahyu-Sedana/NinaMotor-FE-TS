import React, { useContext } from "react";
import { types as t, Instance } from "mobx-state-tree";
import { UserStore } from "./UserStore";

const RootStoreModel = t.model("RootStore", {
  userStore: UserStore,
});

export const rootStore = RootStoreModel.create({
  userStore: UserStore.create({}),
});

export type IRootStore = Instance<typeof RootStoreModel>;

export const StoreContext = React.createContext<IRootStore>(rootStore);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
