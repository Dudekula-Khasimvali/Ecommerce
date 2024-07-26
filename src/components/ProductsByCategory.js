import { useEffect, useState } from "react";
import axios from 'axios';
import './customerProductList.css'; 
import { Link, useParams } from "react-router-dom";
 
function ProductsByCategory() {

    const [productsArray, setProductsArray] = useState([]);
    const {id}  =  useParams();


    useEffect(() => {
        getProductsClick();
    }, []);

    function getProductsClick() {
        let url = "http://localhost:3500/products?category=" + id;
        axios.get(url).then((resData) => {
            setProductsArray(resData.data);
        });
    }



    let resultArray = productsArray.map((item, index) =>
        <div className="productCard">
            <img src={item.productImage} height={100} width="100" />
            <br />
            <span className="prdName">{item.productName}</span>  <br />
            <span className="prdPrice"> ₹ {item.unitPrice.toFixed(2)}</span>
            <br /><br/>
            <Link className="btn btn-primary" to={"/ProductDetails/" +  item.id}>View Details</Link>
        </div>
    );

    return (
        <>
            {resultArray}
        </>
    );
}

export default ProductsByCategory;