import React from "react";
import { Link, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        token !== "" ? <Component {...props} /> : <Link to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
