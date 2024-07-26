import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'; // Assuming you have a CSS file for custom styles

function NavBar() {
  return (
    <div className="container">  
      <nav className="fixed-top navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand" href="/">		
          <i style={{fontSize:"40px"}} className="bi bi-house-heart"></i>    
        </a>
  
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">     
              <Link className="nav-link" to="/Login">Login</Link>
            </li>
            <li className="nav-item">     
              <Link className="nav-link" to="/Admin">Admin</Link>
            </li>
            <li className="nav-item">      
              <Link className="nav-link" to="/AllProducts">Products</Link>
            </li>
            <li className="nav-item">      
              <Link className="nav-link" to="/ShoppingCart">Cart</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbardrop" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <div className="dropdown-menu" aria-labelledby="navbardrop">       
                <Link className="dropdown-item" to="/ProductByCategory/Mobile">Luxury Mobiles</Link>
                <Link className="dropdown-item" to="/ProductByCategory/Gaming">Gaming Mobiles</Link>
                <Link className="dropdown-item" to="/ProductByCategory/Earbuds">Earbuds</Link>
                <Link className="dropdown-item" to="/ProductByCategory/TV">TV</Link>
                <Link className="dropdown-item" to="/ProductByCategory/Watch">Watch</Link>
                <Link className="dropdown-item" to="/ProductByCategory/Pen">Pen</Link>
              </div>   
            </li>
          </ul>
        </div>  
      </nav> 
    </div>        
  );
}

export default NavBar;
