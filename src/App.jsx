import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import Index from "./pages/index";
import Verify from "./pages/auth/verify/index";
import Forgot from "./pages/auth/forgot/index";
import Reset from "./pages/auth/reset/index";
import NotFoundPage from "./pages/not-found/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth/verify" element={<Verify />} />
      <Route path="/auth/forgot" element={<Forgot />} />
      <Route path="/auth/reset" element={<Reset />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
