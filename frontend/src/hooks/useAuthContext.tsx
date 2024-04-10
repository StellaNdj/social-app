import { AuthContext } from "../context/authContext.tsx";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw Error('useAuthContext must be done inside the provider')
  };

  return context;
};
