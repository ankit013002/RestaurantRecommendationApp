import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Results from "./components/Results";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
