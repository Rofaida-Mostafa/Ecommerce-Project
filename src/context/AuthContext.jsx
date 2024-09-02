import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const authContextProvider = createContext(); //return obj;

export default function AuthContext({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("tkn")? localStorage.getItem("tkn") : null
  );
  const [userId, setUseId] = useState(null);

  function decodeddId() {
    let data = jwtDecode(window.localStorage.getItem("tkn"));
    setUseId(data.id);
  }

  useEffect(() => {
    //usestate can work with useEffect in Did Mount phase.

    const userToken = localStorage.getItem("tkn");

    if (userToken != null) {
      setToken(userToken);
      decodeddId();
    }
  }, []);

  return (
    <>
      <authContextProvider.Provider
        value={{ token, setToken, userId, decodeddId }}
      >
        {children}
      </authContextProvider.Provider>
    </>
  );
}
