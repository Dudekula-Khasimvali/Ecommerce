import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
import Forgotpsw from './components/Forgotpsw';
import OrderInfo from './components/OrderInfo';
import AddressForm from './components/AddressForm';
import OrderSuccess from './components/OrderSuccess';
import OrderDetails from './components/OrderDetails';
import AllOrders from './components/AllOrders';

const routing = (
  <Router>
    <NavBar />
    <br/><br/><br/>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Admin" element={<CURDoperations />} />
      <Route path="/AllProducts" element={<CustomerProductList />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/ShoppingCart" element={<ShoppingCart />} />
      <Route path="/ProductByCategory/:id" element={<ProductsByCategory />} />
      <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      <Route path="/OrderConfirmed/:id" element={<OrderConfirmed />} />
      <Route path="/rigister" element={<RegisterForm />} />
      <Route path="/forpsw" element={<Forgotpsw />} />
      <Route path="/info/:id" element={<OrderInfo />} />
      <Route path="/address" element={<AddressForm />} />
      <Route path="/OrderSuccess" element={<OrderSuccess />} />
      <Route path="/order-details/:orderId" element={<OrderDetails />} />
      <Route path="/orders" element={<AllOrders />} />
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

reportWebVitals();
