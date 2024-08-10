import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

function ProductDetails() {
    const { id } = useParams();  // Get the id from the URL params
    const [product, setProduct] = useState({
        id: 0,
        productName: "",
        category: "",
        description: "",
        unitPrice: 0,
        productImage: ""
    });
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchProductDetails(id);
        } else {
            console.error("Product ID is not present in the URL");
            alert('Invalid product ID. Please try again.');
            navigate("/");
        }
    }, [id]);

    const fetchProductDetails = (productId) => {
        const url = `http://localhost:3500/products/${productId}`;
        console.log("Fetching product details from URL:", url);

        axios.get(url)
            .then((response) => {
                console.log("Fetched product data:", response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                alert('Failed to fetch product details. Please try again later.');
            });
    };

    const addToCart = () => {
        const userId = sessionStorage.getItem("USER_ID");
        if (!userId) {
            alert("Please login before adding items to the cart.");
            navigate("/Login");
            return;
        }

        const cartItem = {
            productName: product.productName,
            productImage: product.productImage,
            unitPrice: product.unitPrice,
            quantity: qty,
            total: product.unitPrice * qty,
            userId: userId
        };

        const url = "http://localhost:3500/cart";
        axios.post(url, cartItem)
            .then(() => {
                navigate("/ShoppingCart");
            })
            .catch((error) => {
                console.error("Error adding product to cart:", error);
                alert('Failed to add product to cart. Please try again.');
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'flex-start' }}>
                <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>← Go Back</button>
            </div>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <div id="carouselExampleRide" className="carousel slide" data-bs-ride="carousel" style={{ maxWidth: '500px' }}>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={product.productImage} className="d-block w-100 shadow" alt="Product Slide" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }} />
                            </div>
                            <div className="carousel-item">
                                <img src={product.productImage} className="d-block w-100 shadow" alt="Product Slide" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }} />
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
                    <h1>{product.productName}</h1>
                    <p style={{ fontSize: '1.5em', color: 'green' }}>₹ {product.unitPrice.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <b>Quantity: </b>
                        <button onClick={() => { if (qty > 1) setQty(qty - 1) }} style={{ margin: '0 10px' }}>-</button>
                        {qty}
                        <button onClick={() => setQty(qty + 1)} style={{ margin: '0 10px' }}>+</button>
                    </div>
                    <p><b>Product Description: </b><span style={{ color: 'blue' }}>{product.description}</span></p>
                    <button onClick={addToCart} style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
