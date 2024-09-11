import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import Index from "./pages";
import Verify from "./pages/auth/verify";
import Forgot from "./pages/auth/forgot";
import Reset from "./pages/auth/reset";
import { NotFound } from "./components/status-pages";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Optimistic from "./components/special/Optimistic";
import User from "./pages/users/[username]";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/auth/verify"
        element={
          <Optimistic>
            <Verify />
          </Optimistic>
        }
      />
      <Route path="/auth/forgot" element={<Forgot />} />
      <Route path="/auth/reset" element={<Reset />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route path="/users/:username" element={<User />} />
    </Routes>
  );
}

export default App;
