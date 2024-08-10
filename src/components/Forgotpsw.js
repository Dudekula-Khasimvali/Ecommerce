import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordForm = () => {
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUserValid, setIsUserValid] = useState(false);
  const [userId, setUserId] = useState(null);
  const Navigate = useNavigate();

  const validateUser = async (e) => {
    e.preventDefault();

    if (!uname) {
      toast.error('Please enter your username.', { position: "top-center" });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3500/users?email=${uname}`);
      const data = await response.json();

      if (data.length === 0) {
        toast.error('User Not Found', { position: "top-center" });
      } else {
        setIsUserValid(true);
        setUserId(data[0].id);  // Assuming the API returns an array of users and taking the first one
        toast.success('Username is valid. Please enter your new password.', { position: "top-center" });
      }
    } catch (error) {
      console.error('Error validating user:', error);
      toast.error('An error occurred. Please try again.', { position: "top-center" });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.', { position: "top-center" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', { position: "top-center" });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3500/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        toast.success('Password changed successfully!', { position: "top-center" });

        setTimeout(() => {
          Navigate("/login");
        }, 1500);
        // Reset the form fields
        setUname('');
        setPassword('');
        setConfirmPassword('');
        setIsUserValid(false);
        setUserId(null);
      } else {
        toast.error('Failed to change password. Please try again.', { position: "top-center" });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('An error occurred. Please try again.', { position: "top-center" });
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Forgot Password</h2>
      {!isUserValid ? (
        <form onSubmit={validateUser} className="mx-auto mt-4" style={{ maxWidth: '500px' }}>
          <div className="mb-3">
            <label htmlFor="uname" className="form-label">Username</label>
            <input
              type="text"
              id="uname"
              className="form-control"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Check Username</button>
        </form>
      ) : (
        <form onSubmit={handleChangePassword} className="mx-auto mt-4" style={{ maxWidth: '500px' }}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
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
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Change Password</button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ForgotPasswordForm;
