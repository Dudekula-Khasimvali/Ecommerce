import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="card mb-4 shadow-sm" style={cardStyle}>
          <div className="card-body text-center">
            <h5 className="card-title">Order ID: {order.id}</h5>
            <p className="card-text">Order Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p className="card-text">Total Amount: ₹{order.totalAmount}</p>
            <h6 className="mt-4">Items:</h6>
            <ul className="list-group list-group-flush">
              {order.items.map((item, index) => (
                <li className="list-group-item" key={index} style={{ backgroundColor: 'transparent', border: 'none' }}>
                  Product ID: {item.productId}, Quantity: {item.quantity}, Unit Price: ₹{item.unitPrice}
                </li>
              ))}
            </ul>
            <h6 className="mt-4">Delivery Address:</h6>
            <p className="card-text">
              {order.address.addressLine1}, {order.address.addressLine2}, {order.address.buildingNameNumber}, {order.address.streetName}, {order.address.state}, {order.address.pincode}
            </p>
            <h6 className="mt-4">Payment Method:</h6>
            <p className="card-text">{order.paymentMethod}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
};

document.addEventListener('mouseover', (e) => {
  if (e.target.closest('.card')) {
    e.target.closest('.card').style.boxShadow = 'inset 0px 0px 20px rgba(0, 0, 0, 0.2)';
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.closest('.card')) {
    e.target.closest('.card').style.boxShadow = 'inset 0px 0px 10px rgba(0, 0, 0, 0.1)';
  }
});

export default AllOrders;
