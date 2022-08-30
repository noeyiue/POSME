import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom"
import Home from './pages/Home.js'

function App() {
  return (
      <Browser>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </Browser>

  );
}

export default App;
