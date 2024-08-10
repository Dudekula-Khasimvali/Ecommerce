import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3500/orders/${orderId}`)
      .then(response => {
        setOrderDetails(response.data);
      })
      .catch(error => {
        console.error("Error fetching order details:", error);
      });
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="card mb-4" style={styles.card}>
        <div className="card-body" style={styles.cardBody}>
          <h2 style={styles.title}>Order Details</h2>
          <p style={styles.text}>Order ID: {orderDetails.id}</p>
          <p style={styles.text}>Order Date: {new Date(orderDetails.orderDate).toLocaleString()}</p>
          <p style={styles.text}>Total Amount: ₹{orderDetails.totalAmount}</p>
        </div>
      </div>

      <div className="card mb-4" style={styles.card}>
        <div className="card-body" style={styles.cardBody}>
          <h5 style={styles.subtitle}>Items:</h5>
          <ul style={styles.list}>
            {orderDetails.items.map((item, index) => (
              <li key={index} style={styles.listItem}>
                Product ID: {item.productId}<br/>
                 Quantity: {item.quantity}<br/>
                  Unit Price: ₹{item.unitPrice}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mb-4" style={styles.card}>
        <div className="card-body" style={styles.cardBody}>
          <h5 style={styles.subtitle}>Delivery Address:</h5>
          <p style={styles.text}>
            {orderDetails.address.addressLine1}, {orderDetails.address.addressLine2}, {orderDetails.address.streetName}, {orderDetails.address.state}, {orderDetails.address.pincode}
          </p>
        </div>
      </div>

      <div className="card mb-4" style={styles.card}>
        <div className="card-body" style={styles.cardBody}>
          <h5 style={styles.subtitle}>Payment Method:</h5>
          <p style={styles.text}>{orderDetails.paymentMethod}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 10px rgba(0, 0, 0, 0.1)',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  subtitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'center',
  },
  listItem: {
    fontSize: '16px',
    marginBottom: '5px',
  },
};

export default OrderDetails;
