import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function ShoppingCart() {
  const [cartArray, setCartArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserLogin();
    getCartItems();
  }, []);

  function checkUserLogin() {
    let userId = sessionStorage.getItem("USER_ID");
    if (!userId) {
      navigate("/Login");
      return;
    }
  }

  function getCartItems() {
    let userId = sessionStorage.getItem("USER_ID");
    if (userId) {
      let url = "http://localhost:3500/cart?userId=" + userId;
      axios.get(url).then((resData) => {
        setCartArray(resData.data);
      }).catch((err) => {
        console.error("Error fetching cart items:", err);
      });
    }
  }

  function removeCartItem(id) {
    let url = "http://localhost:3500/cart/" + id;
    axios.delete(url).then(() => {
      getCartItems();
    }).catch((err) => {
      console.error("Error removing cart item:", err);
    });
  }

  function proceedToBuy(id) {
    navigate("/info/" + id);
  }

  let finalTotal = 0;

  function getFinalTotalAmount() {
    finalTotal = cartArray.reduce((sum, item) => sum + item.total, 0);
    return finalTotal;
  }

  function checkOutButtonClick() {
    if (cartArray.length === 0) {
      toast.error("No products to order.", { position: "top-center" });
      return;
    }

    let orderObj = {};
    orderObj.orderDate = new Date();
    orderObj.userName = cartArray[0].userName;
    orderObj.totalAmount = finalTotal;

    let url = "http://localhost:3500/orders";
    axios.post(url, orderObj).then((resData) => {
      navigate("/OrderConfirmed/" + resData.data.id);
    }).catch((err) => {
      console.error("Error placing order:", err);
    });
  }

  let resultArray = cartArray.map((item, index) => (
    <div
      key={index}
      className="card mb-3"
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="row g-0" style={{ boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div className="col-md-4">
          <img
            src={item.productImage}
            className="img-fluid rounded-start"
            alt={item.productName}
            style={{ height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{item.productName}</h5>
            <p className="card-text">Price: ₹{item.unitPrice.toFixed(2)}</p>
            <p className="card-text">Quantity: {item.quantity}</p>
            <p className="card-text">Total: ₹{item.total.toFixed(2)}</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={() => proceedToBuy(item.id)}>Proceed to Buy</button>
              <button className="btn btn-danger" onClick={() => removeCartItem(item.id)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <ToastContainer />
      <h3 style={{ textAlign: "center" }}>Shopping Cart</h3>
      <hr />
      <div style={{ fontWeight: 'bold', borderRadius: '1%', display: 'flex', justifyContent: 'flex-start' }}>
        <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>← Go Back</button>
      </div>
      {resultArray}
      <hr />
      <div style={{ textAlign:'left' }}>
        <h4>Final Total: ₹{getFinalTotalAmount().toFixed(2)}</h4>
        {/* <button className="btn btn-primary" onClick={checkOutButtonClick}>Place Order</button> */}
      </div>
    </div>
  );
}

export default ShoppingCart;
