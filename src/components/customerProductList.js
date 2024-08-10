import React, { useEffect, useState } from "react";
import axios from 'axios';
import './customerProductList.css';
import { Link } from "react-router-dom";

function CustomerProductList() { 
    const [productsArray, setProductsArray] = useState([]);

    useEffect(() => {
        getProductsClick();
    }, []);

    function getProductsClick() {     
        let url = "http://localhost:3500/products"; 
        axios.get(url)
            .then((res) => {
                setProductsArray(res.data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });       
    }

    const resultArray = productsArray.map((item, index) => (
        <div className="productCard" key={index}>
            <img 
                src={item.productImage} 
                height={100} 
                width="100" 
                alt={item.productName}
                onError={(e) => e.target.src = "https://via.placeholder.com/100"}
            />
            <br/>
            <span className="prdName">{item.productName}</span> <br/>
            <span className="prdPrice">₹ {typeof item.unitPrice === 'number' ? item.unitPrice.toFixed(2) : '9595'}</span>
            <br/><br/>  
            <button className="btn btn-primary">
                <Link to={`/ProductDetails/${item.id}`} style={{ color: "white", textDecoration: "none" }}>View Details</Link>
            </button>
            <div className="popup">
                <img 
                    src={item.productImage} 
                    height={100} 
                    width="100" 
                    alt={item.productName}
                    onError={(e) => e.target.src = "https://via.placeholder.com/100"}
                />
                <div className="prdName">{item.productName}</div>
                <div>{item.description}</div>
                <div className="prdPrice">₹ {typeof item.unitPrice === 'number' ? item.unitPrice.toFixed(2) : '9595'}</div>
            </div>
        </div>        
    ));

    return (
        <div className="product-container">
              <li className="nav-item" >
      <div className="dropdown-large">
        <Link className="dropdown-item" to="/ProductByCategory/Mobile">
          <img src={`${process.env.PUBLIC_URL}/images/44e10b16e649b691.webp`} alt="Mobiles & Tablets" className="category-image" />
          Mobiles & Tablets
        </Link>
        <Link className="dropdown-item" to="/ProductByCategory/TV">
          <img src={`${process.env.PUBLIC_URL}/images/717b5077a5e25324.jpg`} alt="TVs & Appliances" className="category-image" />
          TVs & Appliances
        </Link>
        <Link className="dropdown-item" to="/ProductByCategory/Electronics">
          <img src={`${process.env.PUBLIC_URL}/images/4da1d0d19350cc84.jpg`} alt="Electronics" className="category-image" />
          Electronics
        </Link>
        
      </div>
    </li>
    <div>
            {resultArray}
            </div>
        </div>
    );
}

export default CustomerProductList;
