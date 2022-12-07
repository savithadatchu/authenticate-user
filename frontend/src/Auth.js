
import React, { useState } from "react"
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [permission, setPermission] = useState("");
  const [errorMessage, setError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (email && password) {
      axios.post(
        "http://localhost:8080/api/user/signin",
        { email, password }
      ).then(response => {
        const token = response.data.token;
        var decodedToken = jwt_decode(token);
        setRole(decodedToken.role);
        setPermission(decodedToken.permission);
        
      }).catch(err => {
        setError(err.response.data.message);
      })
    } else {
      setError("Missing credentials")
    }
  }

  return (
     <div className="Auth-form-container">
      {role? `You are assigned to the role: ${role} and with permission: ${permission}`:<form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={(e) => handleClick(e)}>
              Submit
            </button>
          </div>
          <div className="error">{errorMessage}</div>
        </div>
      </form>}
    </div>
  )
}
