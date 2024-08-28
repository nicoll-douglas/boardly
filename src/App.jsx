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
import { ProfileProvider } from "./features/user-profile/contexts/ProfileContext";
import Board from "./features/boards/components/Board";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/auth/verify/:token" element={<VerificationPage />} />
      <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
      <Route path="/auth/reset/:token" element={<NewPwdPage />} />

      <Route element={<ProfileProvider />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/boards/:boardName" element={<Board />}>
          <Route index element={<BoardPage />} />
          <Route path="threads/:threadID" element={<ThreadsPage />} />
        </Route>
      </Route>

      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
