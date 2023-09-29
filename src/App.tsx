import { HashRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Dahsboard from "./assets/pages/Dashboard";
import Data from "./assets/pages/Data";
import Sidebar from "./assets/components/Global/Sidebar";
import { Footer } from "./assets/components/Global/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar /> 
          <Routes>
            <Route path="/" element={<Dahsboard />} />
            <Route path="/dados" element={<Data />} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
