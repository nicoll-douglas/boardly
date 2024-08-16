import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import IndexPage from "./routes/page";
import HomePage from "./routes/home/page";
import VerificationPage from "./routes/auth/verify/page";
import ForgotPasswordPage from "./routes/auth/forgot/page";
import NewPwdPage from "./routes/auth/reset/page";
import ProfilePage from "./routes/profile/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/auth/verify/:token" element={<VerificationPage />}></Route>
      <Route path="/auth/forgot" element={<ForgotPasswordPage />}></Route>
      <Route path="/auth/reset/:token" element={<NewPwdPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
    </Routes>
  );
}

export default App;
