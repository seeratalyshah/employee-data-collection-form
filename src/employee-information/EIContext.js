// components/employee-information/EIContext.js
import { createContext, useContext } from "react";

export const EIContext = createContext({
  /* will be injected from the hook */
  submitErrorMessage: "",
  setSubmitErrorMessage: () => {},
  onError: () => {},
});
export const useEI = () => useContext(EIContext);
