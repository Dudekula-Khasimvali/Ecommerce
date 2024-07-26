import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const validateEmail = (email) => {
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };

  // const validatePhone = (phone) => {
  //   const regex = /^\d{10}$/; // Example for 10-digit phone number
  //   return regex.test(phone);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // // Validate email
    // if (!validateEmail(email)) {
    //   toast.error('Please enter a valid email address.');
    //   return;
    // }
    // else{
    //   toast.success('Email is valid.');
    // }

    //Valid Email
    if (email.trim("")) {
      toast.error('Please enter email.');
      return;
    }

    // Validate phone number
    // if (!validatePhone(phone)) {
    //   toast.error('Please enter a valid phone number (10 digits).');
    //   return;
    // }
    // else{
    //   toast.success('Phone number is valid.');
    // }

    

    // Validate password
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }else{
      toast.success('Password is valid.');
    }

    // Confirm password
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }else{
      toast.success('Passwords match.');
    }

    // Handle successful form submission
    toast.success('Registration successful!');
    // Reset the form fields
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Register</h2>
      <form onSubmit={handleSubmit} className="mx-auto mt-4" style={{ maxWidth: '500px' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
        <div className="text-center mt-3">
          <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to="/login">
            Already have a account?
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
