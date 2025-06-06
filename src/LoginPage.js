import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginPage.css"; 

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); 

  const handleLogin = () => {
    setError("");
    if (!username || !password) {
      setError("Fields cannot be empty");
      return;
    }

    if (username === "user123" && password === "pass123") {
      setIsLoggedIn(true);
    } else if (username === "user123" && password !== "pass123") {
      setError("Invalid credentials");
    } else {
      setError("User not found");
    }
  };

  // ✅ Redirect after successful login
  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        navigate("/search");
      }, 1000); // Optional delay for showing "Login successful"

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Parking App Login</h2>
        {isLoggedIn ? (
          <p className="success-message">Login successful! Redirecting...</p>
        ) : (
          <>
            {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="login-input password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="toggle-password" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
