import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddressForm from './AddressForm';

function OrderInfo() {
  const { id } = useParams();  // Get the product ID from the URL
  const [cartItem, setCartItem] = useState(null);
  const [address, setAddress] = useState({
    addressLine1: 'H no 54',
    addressLine2: 'Ghass mandi',
    state: 'UTTAR PRADESH',
    pincode: '251001',
    buildingNameNumber: '',
    streetName: 'MUZAFFARNAGAR'
  });
  const [addresses, setAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [upiID, setUpiID] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    productName: 'N/A',
    itemsTotal: 0,
    delivery: 40,
    promotions: 660,
    orderTotal: 0
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {  
      fetchCartItem();
    } else {
      console.error("Product ID is not present in the URL");
      toast.error('Invalid product ID. Please try again.', { position: 'top-center' });
      navigate("/");
    }
  }, [id]);

  const fetchCartItem = () => {
    axios.get(`http://localhost:3500/cart/${id}`)
      .then(response => {
        const cartItem = response.data;
        setCartItem(cartItem);
        updateOrderSummary(cartItem.productName, cartItem.unitPrice, cartItem.quantity);
      })
      .catch(error => {
        console.error("Error fetching cart details:", error);
        toast.error('Failed to fetch cart details. Please try again later.', { position: 'top-center' });
      });
  };

  const updateOrderSummary = (productName, productPrice, quantity) => {
    const itemsTotal = productPrice * quantity;
    const orderTotal = itemsTotal + orderSummary.delivery - orderSummary.promotions;

    setOrderSummary({
      productName: productName,
      itemsTotal: itemsTotal,
      delivery: orderSummary.delivery,
      promotions: orderSummary.promotions,
      orderTotal: orderTotal
    });
  };

  const handleOrderSubmit = () => {
    if (!address || !paymentMethod) {
      toast.error('Please Enter all details.', { position: 'top-center' });
      return;
    }
  
    if (paymentMethod === 'Credit/Debit Card' && cardNumber.length !== 12) {
      toast.error('Card number must be 12 digits long.', { position: 'top-center' });
      return;
    }
  
    const orderObj = {
      orderDate: new Date().toISOString(),
      totalAmount: orderSummary.orderTotal,
      address: address,
      paymentMethod: paymentMethod,
      items: [
        {
          productId: cartItem.id,
          quantity: cartItem.quantity,
          unitPrice: orderSummary.itemsTotal,
        }
      ]
    };
  
    axios.post("http://localhost:3500/orders", orderObj)
      .then((response) => {
        toast.success('Order placed successfully!', { position: 'top-center' });
        const orderId = response.data.id; // Assuming the response contains the new order's ID
        navigate("/OrderSuccess", { state: { orderId } });
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        toast.error('Failed to place order. Please try again later.', { position: 'top-center' });
      });
  };
  

  const handleUpiVerification = () => {
    if (upiID === '') {
      toast.error('Please enter a valid UPI ID.', { position: 'top-center' });
      return;
    }
    toast.success('UPI Verified!', { position: 'top-center' });
  };

  const handleAddressSave = (newAddress) => {
    setAddress(newAddress);
    setShowAddressForm(false);
    toast.success('Address saved successfully!', { position: 'top-center' });
  };

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h3 style={{ textAlign: "center" }}>Order Information</h3>
      <hr />
      <div style={{ fontWeight: 'bold', borderRadius: '1%', display: 'flex', justifyContent: 'flex-start' }}>
        <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>← Go Back</button>
      </div><br/>
      <div className="row">
        <div className="col-md-8">
          {/* Delivery Address */}
          <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>1. Delivery Address</h5>
              <button style={{textDecoration:'none'}} className="btn btn-link" onClick={() => setShowAddressForm(true)}>Change</button>
            </div>
            <div className="card-body">
              <p>{address.addressLine1}, {address.addressLine2}, {address.buildingNameNumber}, {address.streetName}, {address.state}, {address.pincode}</p>
              <button style={{textDecoration:'none'}} className="btn btn-link" onClick={() => setShowAddressForm(true)}>+ Add delivery instructions</button>
            </div>
          </div>
          {/* Payment Method */}
          <div className="card mb-3">
            <div className="card-header">
              <h5>2. Select a Payment Method</h5>
            </div>
            <div className="card-body">
              {/* Credit/Debit Card */}
              <div className="form-check">
                <input className="form-check-input" type="radio" name="paymentMethod" value="Credit/Debit Card" id="creditCard" onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className="form-check-label" htmlFor="creditCard">
                  Credit or debit card
                </label>
                {paymentMethod === 'Credit/Debit Card' && (
                  <div className="mt-2">
                    <input type="text" className="form-control" placeholder="Enter card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                  </div>
                )}
                <div className="mt-2">
                  <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                  <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
                  <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" />
                  <img src="https://img.icons8.com/color/48/000000/rupay.png" alt="Rupay" />
                </div>
              </div>
              {/* Net Banking */}
              <div className="form-check mt-3">
                <input className="form-check-input" type="radio" name="paymentMethod" value="Net Banking" id="netBanking" onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className="form-check-label" htmlFor="netBanking">
                  Net Banking
                </label>
                {paymentMethod === 'Net Banking' && (
                  <select className="form-control mt-2">
                    <option>Choose an Option</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                )}
              </div>
              {/* UPI */}
              <div className="form-check mt-3">
                <input className="form-check-input" type="radio" name="paymentMethod" value="UPI" id="upi" onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className="form-check-label" htmlFor="upi">
                  Other UPI Apps
                </label>
                {paymentMethod === 'UPI' && (
                  <>
                    <input type="text" className="form-control mt-2" placeholder="Enter UPI ID" value={upiID} onChange={(e) => setUpiID(e.target.value)} />
                    <button className="btn btn-link" onClick={handleUpiVerification}>Verify</button>
                  </>
                )}
              </div>
              {/* Cash on Delivery */}
              <div className="form-check mt-3">
                <input className="form-check-input" type="radio" name="paymentMethod" value="Cash On Delivery" id="cod" defaultChecked onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className="form-check-label" htmlFor="cod">
                  Cash On Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {/* Order Summary */}
          <div className="card">
            <div className="card-header">
              <h5>Order Summary</h5>
            </div>
            <div className="card-body">
              <p><strong>{orderSummary.productName}</strong></p>
              <p>Items Total: ₹{orderSummary.itemsTotal}</p>
              <p>Delivery: ₹{orderSummary.delivery}</p>
              <p>Promotions: -₹{orderSummary.promotions}</p>
              <hr />
              <h5>Order Total: ₹{orderSummary.orderTotal}</h5>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary btn-block" onClick={handleOrderSubmit}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
      {/* Show Address Form Modal */}
      {showAddressForm && (
  <AddressForm
    show={showAddressForm}
    onHide={() => setShowAddressForm(false)}
    onSave={handleAddressSave}
    addresses={addresses} // Assuming addresses is passed as a prop or fetched from an API
  />
)}

    </div>
  );
}

export default OrderInfo;
