import { Routes, Route } from "react-router-dom";
import IndexPage from "./routes/page";
import "./assets/styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />}></Route>
    </Routes>
  );
}

export default App;
