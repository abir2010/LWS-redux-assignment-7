import "./App.css";
import Addjobpage from "./pages/Addjobpage";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/form" element={<Addjobpage />} />
      </Routes>
    </Router>
  );
}

export default App;
