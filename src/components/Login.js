import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginClick() {
    if (!uname && !password) {
      toast.error("Please enter all the fields", { position: "top-center" });
    } else if (!uname) {
      toast.error("Please enter UserName", { position: "top-center" });
    } else if (!password) {
      toast.error("Please enter password", { position: "top-center" });
    } else {
      try {
        const response = await fetch(`http://localhost:3500/users?email=${uname}&password=${password}`);
        const data = await response.json();

        if (data.length === 0) {
          toast.error("User Not Found or Incorrect Password", { position: "top-center" });
        } else {
          sessionStorage.setItem("USER_ID", data[0].email); // or data[0].id if you have a unique ID
          toast.success("Login successful", { position: "top-center" });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.error('Error during login:', error);
        toast.error("An error occurred. Please try again.", { position: "top-center" });
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>User Login</h1>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>User Name:</label>
          <input
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          onClick={loginClick}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer' }}
        >
          Login
        </button>
        <div style={{justifyContent:'space-between' , display:'flex'}}>
          <Link style={{textDecoration:'none' , color:'black' , fontWeight:'bold'}} to={"/rigister"}>Don't Have Account?</Link>
          <Link style={{textDecoration:'none' , color:'black' , fontWeight:'bold' }} to={"/forpsw"}>Forgot Password?</Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
