import { useEffect, useState } from "react";
import axios from 'axios';
import './Latest.css';
import { Link } from "react-router-dom";

function LatestProducts() {

    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        getProductsClick();
    }, []);

    function getProductsClick() {
        let url = "http://localhost:3500/products?_sort=id&_order=desc&_limit=3";
        axios.get(url).then((resData) => {
            setLatestProducts(resData.data);
        });
    }

    let resultArray = latestProducts.map((item, index) => {
        // Handle the case where unitPrice might not be a number
        const unitPrice = parseFloat(item.unitPrice);
        const formattedPrice = isNaN(unitPrice) ? "N/A" : `₹ ${unitPrice.toFixed(2)}`;

        return (
            <div className="product-card" key={index}>
                <div className="card" style={{ textAlign: "center" }}>
                    <div style={{ paddingRight: '5%' }}>
                        <img src={item.productImage} alt={item.productName} height={100} width="100" />
                    </div>
                    <br />
                    <span className="prdName">{item.productName}</span> <br />
                    <span className="prdPrice">{formattedPrice}</span>
                    <br />
                    <Link to={"/ProductDetails/" + item.id}>
                        <button className="btn btn-info" style={{ fontSize: '12px', padding: '5px 10px' }}>
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        );
    });

    return (
        <div className="product-container">
            {resultArray}
        </div>
    );
}

export default LatestProducts;
