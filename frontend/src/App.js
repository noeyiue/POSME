import './App.css';
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom"
import Home from './pages/Home.js'
import Cashier from './pages/Cashier.js'
import Users from './pages/Users.js'
import Items from './pages/Items.js'
import Reports from './pages/Report.js'


function App() {
  return (
      <Browser>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/store/cashier" element={<Cashier />} />
          <Route path="/store/items" element={<Items />} />
          <Route path="/store/reports" element={<Reports />} />
          <Route path="/store/users" element={<Users />} />
        </Routes>
      </Browser>

  );
}

export default App;
