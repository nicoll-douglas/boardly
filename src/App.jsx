import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import Index from "./pages/index";
import Verify from "./pages/auth/verify/index";
import Forgot from "./pages/auth/forgot/index";
import Reset from "./pages/auth/reset/index";
import NotFound from "./pages/404";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Optimistic from "./components/special/Optimistic";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
