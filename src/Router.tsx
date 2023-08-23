import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";

const Router = () => {
  const token = window.localStorage.getItem("JWT");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate replace to="/todo" />
            ) : (
              <Navigate replace to="/signin" />
            )
          }
        />
        <Route path="/todo" element={<App />} />
        <Route
          path="/signup"
          element={token ? <Navigate replace to="/todo" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={token ? <Navigate replace to="/todo" /> : <SignIn />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
