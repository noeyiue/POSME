import './App.css';
import { BrowserRouter as Browser, Route, Routes, Navigate } from "react-router-dom"
import Home from './pages/Home'
import Cashier from './pages/Cashier'
import Users from './pages/Users'
import Items from './pages/Items'
import Reports from './pages/Report'
import Login from './pages/Login'
import Title from './components/title'
import Register from './pages/Register'

function App() {
  const token = localStorage.getItem('accessToken')
  console.log(token)
  if(!token) {
    return (
      <Browser>
        <Routes>
          <Route path="*" element={<Title />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Browser>
    )
  }
  return (
      <Browser>
        <Routes>
          <Route path="*" element={<Navigate to="/store/home"/> } />
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
