import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { DelayFallback } from "./components/common";
import "./assets/css/styles.css";

import { NotFound } from "./components/status-pages";
const Index = lazy(() => import("./pages"));
const Verify = lazy(() => import("./pages/auth/verify"));
const Forgot = lazy(() => import("./pages/auth/forgot"));
const Reset = lazy(() => import("./pages/auth/reset"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const User = lazy(() => import("./pages/users/[username]"));
const Home = lazy(() => import("./pages/home"));
const Me = lazy(() => import("./pages/me"));
const Board = lazy(() => import("./pages/boards/[boardName]"));
const Thread = lazy(() => import("./pages/threads/[threadName]"));
const HeaderLayout = lazy(() => import("./layouts/Header.layout"));
const BoardsListLayout = lazy(() => import("./layouts/BoardsList.layout"));
import { useScrollRestoration } from "./hooks";

function App() {
  useScrollRestoration();
  return (
    <Suspense fallback={<DelayFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/auth/verify" element={<Verify />} />
        <Route path="/auth/forgot" element={<Forgot />} />
        <Route path="/auth/reset" element={<Reset />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route element={<HeaderLayout />}>
          <Route caseSensitive path="/users/:username" element={<User />} />
          <Route path="/me" element={<Me />} />

          <Route element={<BoardsListLayout />}>
            <Route
              caseSensitive
              path="/boards/:boardName"
              element={<Board />}
            />
            <Route
              caseSensitive
              path="/threads/:threadId"
              element={<Thread />}
            />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
