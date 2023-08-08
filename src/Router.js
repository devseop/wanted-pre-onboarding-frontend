import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<TodoList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
