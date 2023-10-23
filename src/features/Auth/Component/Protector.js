import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protector = ({ children }) => {
  const userselect = useSelector((state) => state.userAuth.users);

  if (!userselect) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  return children;
};

export default Protector;
