import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./pages/App";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
