import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails(props) {
    let dataObj = {
        "id": 0,
        "productName": "",
        "category": "",
        "description": "",
        "unitPrice": 0,
        "productImage": ""
    };

    const [productObj, setProductObj] = useState(dataObj);
    const [qty, setQty] = useState(1); 
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getSelectedProductDetails();
    }, []);

    function getSelectedProductDetails() {
        let url = "http://localhost:3500/products/" + id;
        axios.get(url).then((resData) => {
            setProductObj(resData.data);
        });
    }

    function addToCartButtonClick() {
        let userId = sessionStorage.getItem("USER_ID");
        if (!userId) {
            alert("Please Login before adding items to Cart");
            navigate("/Login");
            return;
        }

        let cartObj = {
            productName: productObj.productName,			
            unitPrice: productObj.unitPrice,
            quantity: qty,
            total: productObj.unitPrice * qty,			  			 
            userId: userId
        };

        let url = "http://localhost:3500/cart";
        axios.post(url, cartObj).then((resData) => {
            navigate("/ShoppingCart");
        });
    }

    return (
        <div style={{ padding: '20px' }}>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel" style={{ maxWidth: '500px' }}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={productObj.productImage} className="d-block w-100 shadow" alt="Product Slide" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src={productObj.productImage} className="d-block w-100 shadow" alt="Product Slide" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }} />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="col-md-6">
                    <h1>{productObj.productName}</h1>
                    <p style={{ fontSize: '1.5em', color: 'green' }}>₹ {productObj.unitPrice.toFixed(2)}</p>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <b>Quantity: </b>
                        <button onClick={() => { if (qty > 1) setQty(qty - 1) }} style={{ margin: '0 10px' }}>-</button>
                        {qty}
                        <button onClick={() => setQty(qty + 1)} style={{ margin: '0 10px' }}>+</button>
                    </div>

                    <p><b>Product Description: </b><span style={{ color: 'blue' }}>{productObj.description}</span></p>
                    <button onClick={addToCartButtonClick} style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Add To Cart</button>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link className='btn btn-primary' to="/AllProducts">Continue Shopping</Link>
            </div>
        </div>
    );
}

export default ProductDetails;
