import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContextProvider } from "../../context/AuthContext";

export default function ProtectedRouteAuth({ children }) {
  const {token } = useContext(authContextProvider);

  return token? <Navigate to="/products"></Navigate> : children;
}
