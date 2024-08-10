import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OrderSuccess() {
  const location = useLocation();
  const { orderId } = location.state || {}; // Get the orderId from the navigation state

  return (
    <div className="container text-center mt-5">
      <h2>Congratulations!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to={`/order-details/${orderId}`} className="btn btn-primary mt-3">
        View Order Details
      </Link>
    </div>
  );
}

export default OrderSuccess;
