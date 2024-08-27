import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import IndexPage from "./routes/page";
import BoardPage from "./routes/boards/page";
import VerificationPage from "./routes/auth/verify/page";
import ForgotPasswordPage from "./routes/auth/forgot/page";
import NewPwdPage from "./routes/auth/reset/page";
import ProfilePage from "./routes/profile/page";
import ThreadsPage from "./routes/threads/page";
import NotFoundPage from "./routes/not-found/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}></Route>
      <Route path="/boards/:boardID" element={<BoardPage />}></Route>
      <Route path="/auth/verify/:token" element={<VerificationPage />}></Route>
      <Route path="/auth/forgot" element={<ForgotPasswordPage />}></Route>
      <Route path="/auth/reset/:token" element={<NewPwdPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route
        path="/boards/:boardID/threads/:threadID"
        element={<ThreadsPage />}
      ></Route>
      <Route path="/not-found" element={<NotFoundPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
