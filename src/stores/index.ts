import { useContext } from "react";
import { StoreContext } from "./RootStore";

export const useStore = () => {
  return useContext(StoreContext);
};
