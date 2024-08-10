import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddressForm({ show, onHide, onSave, addresses = [] }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    state: '',
    pincode: '',
    buildingNameNumber: '',
    streetName: ''
  });

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(newAddress);
    }
    onHide();  // Close the modal after saving
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Address Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {addresses.length > 0 ? (
          <Form.Group>
            <Form.Label>Select Address</Form.Label>
            <Form.Control as="select" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
              {addresses.map((address, index) => (
                <option key={index} value={address}>
                  {address.addressLine1}, {address.addressLine2}, {address.streetName}, {address.state}, {address.pincode}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : (
          <p>No saved addresses. Please add a new address.</p>
        )}

        <Form.Group>
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control type="text" name="addressLine1" value={newAddress.addressLine1} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control type="text" name="addressLine2" value={newAddress.addressLine2} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control type="text" name="state" value={newAddress.state} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pincode</Form.Label>
          <Form.Control type="text" name="pincode" value={newAddress.pincode} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Building Name/Number</Form.Label>
          <Form.Control type="text" name="buildingNameNumber" value={newAddress.buildingNameNumber} onChange={handleAddressChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Street Name</Form.Label>
          <Form.Control type="text" name="streetName" value={newAddress.streetName} onChange={handleAddressChange} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Address</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddressForm;
