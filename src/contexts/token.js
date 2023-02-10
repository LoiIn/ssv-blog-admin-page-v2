import React, { useEffect, useState } from "react";

export const TokenContext = React.createContext();

const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") === null ? "" : localStorage.getItem("token")
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <TokenContext.Provider value={[token, setToken]}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContextProvider;
