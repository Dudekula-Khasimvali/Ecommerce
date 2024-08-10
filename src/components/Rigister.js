import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !phone && !password && !confirmPassword) {
      toast.error('Please fill in all the fields.', { position: "top-center" });
      return;
    }

    if (!email) {
      toast.error('Please enter your email.', { position: "top-center" });
      return;
    } else if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.', { position: "top-center" });
      return;
    }

    if (!phone) {
      toast.error('Please enter your phone number.', { position: "top-center" });
      return;
    } else if (!validatePhone(phone)) {
      toast.error('Please enter a valid phone number (10 digits).', { position: "top-center" });
      return;
    }

    if (!password) {
      toast.error('Please enter your password.', { position: "top-center" });
      return;
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.', { position: "top-center" });
      return;
    }

    if (!confirmPassword) {
      toast.error('Please confirm your password.', { position: "top-center" });
      return;
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match.', { position: "top-center" });
      return;
    }

    // Prepare user data
    const userData = {
      email,
      phone,
      password
    };

    try {
      const response = await fetch('http://localhost:3500/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast.success('Registration successful!', { position: "top-center" });
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        
        // Reset the form fields
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
      } else {
        toast.error('Registration failed. Please try again.', { position: "top-center" });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred. Please try again.', { position: "top-center" });
    }
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
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
        <div className="text-center mt-3">
          <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }} to="/login">
            Already have an account?
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
