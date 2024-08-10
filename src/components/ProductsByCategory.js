import { useEffect, useState } from "react";
import axios from 'axios';
import './customerProductList.css'; 
import { Link, useParams } from "react-router-dom";
 
function ProductsByCategory() {
    const [productsArray, setProductsArray] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getProductsClick();
    }, [id]);

    function getProductsClick() {
        const url = `http://localhost:3500/products?category=${id}`;
        axios.get(url).then((resData) => {
            setProductsArray(resData.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    }

    const resultArray = productsArray.map((item, index) => (
        <div className="productCard" key={index}>
            <img src={item.productImage} alt={item.productName} height={100} width={100} />
            <br />
            <span className="prdName">{item.productName}</span>
            <br />
            <div className="prdPrice">₹ {typeof item.unitPrice === 'number' ? item.unitPrice.toFixed(2) : '9595'}</div>
            <br/>
            <Link className="btn btn-primary" to={`/ProductDetails/${item.id}`}>View Details</Link>
        </div>
    ));

    return (
        <>
            {resultArray}
        </>
    );
}

export default ProductsByCategory;
