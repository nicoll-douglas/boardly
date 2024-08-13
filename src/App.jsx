import { Routes, Route } from "react-router-dom";
import "./assets/styles.css";
import IndexPage from "./routes/page";
import HomePage from "./routes/home/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
    </Routes>
  );
}

export default App;
