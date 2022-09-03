import './App.css';
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom"
import Home from './pages/Home.js'
import Cashier from './pages/Cashier.js'
import Users from './pages/Users.js'
import Items from './pages/Items.js'
import Reports from './pages/Report.js'
import Login from './pages/Login.js'
import Title from '../src/components/title.js'
import Navbar from '../src/components/navbar.js'


function App() {
  return (
      <Browser>
        <Navbar />
        <Routes>
          <Route path="*" element={<Title />} />
          <Route path="/login" element={<Login />} />
          <Route path="/store/home" element={<Home />} />
          <Route path="/store/cashier" element={<Cashier />} />
          <Route path="/store/items" element={<Items />} />
          <Route path="/store/reports" element={<Reports />} />
          <Route path="/store/users" element={<Users />} />
        </Routes>
      </Browser>

  );
}

export default App;
