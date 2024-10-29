import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Home from './pages/Home'
import Menu from "./components/Menu"
import Users from './pages/Users'
import Suppliers from './pages/Suppliers';
import Products from './pages/Products';
import Stocks from './pages/Stocks';
import StockMovements from './pages/StockMovements';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import {AuthProvider} from './components/AuthContext';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Menu/>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
            <Route path='/users' element={<PrivateRoute><Users/></PrivateRoute>}></Route>
            <Route path='/suppliers' element={<Suppliers/>}></Route>
            <Route path='/products' element={<Products/>}></Route>
            <Route path='/stocks' element={<Stocks/>}></Route>
            <Route path='/stockmovements' element={<StockMovements/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
