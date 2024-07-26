import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
 

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CURDoperations from './components/CURDoperations';
import CustomerProductList from './components/customerProductList';
import NotFound from './components/NotFound';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import ProductsByCategory from './components/ProductsByCategory';
import OrderConfirmed from './components/OrderConfirmed';
import RegisterForm from './components/Rigister';


const routing = (
  <Router>

    <div>
        <NavBar /> 
    </div><br/><br/><br/>


    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Admin" element={<CURDoperations />} />     
      <Route path="/AllProducts" element={<CustomerProductList />} />           
      <Route path="/Login" element={<Login />} />           
      <Route path="/ShoppingCart" element={<ShoppingCart />} />           
      <Route path="/ProductByCategory/:id" element={<ProductsByCategory />} />           
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />           
      <Route path="/OrderConfirmed/:id" element={<OrderConfirmed />} />           
      <Route path="/rigister" element={<RegisterForm/>} />           
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>

);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();