import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import IndexPage from "./routes/page";
import HomePage from "./routes/home/page";
import VerificationPage from "./routes/auth/verify/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/auth/verify/:token" element={<VerificationPage />}></Route>
    </Routes>
  );
}

export default App;
