import React from 'react';
import { Link } from 'react-router-dom';
import './frontpage.css';

function FrontPage() {
  return (
    <div className="frontpage">
      <div className="header">
        <div className="nav-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      </div>
      <div className="main-content">
        <h1>Welcome to Expense Tracker</h1>
        <p>Track your expenses easily and efficiently.</p>
      </div>
    </div>
  );
}

export default FrontPage;
