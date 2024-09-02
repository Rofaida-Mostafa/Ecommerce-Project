import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  // return token ? children : <Login />

  if (localStorage.getItem("tkn") == null) {
    return <Navigate to="/signIn"></Navigate>;
  }
  return <>{children}</>;
}
