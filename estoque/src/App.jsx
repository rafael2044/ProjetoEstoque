import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import {AuthProvider} from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Menu from "./components/Menu"
import Login from './pages/Login';
import Home from './pages/Home'
import Users from './pages/Users'
import Suppliers from './pages/Suppliers';
import Products from './pages/Products';
import Stocks from './pages/Stocks';
import StockMovements from './pages/StockMovements';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Menu/>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}></Route>
            <Route path='/users' element={<PrivateRoute><Users/></PrivateRoute>}></Route>
            <Route path='/suppliers' element={<PrivateRoute><Suppliers/></PrivateRoute>}></Route>
            <Route path='/products' element={<PrivateRoute><Products/></PrivateRoute>}></Route>
            <Route path='/stocks' element={<PrivateRoute><Stocks/></PrivateRoute>}></Route>
            <Route path='/stockmovements' element={<PrivateRoute><StockMovements/></PrivateRoute>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
