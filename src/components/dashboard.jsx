import React from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddExpense = () => {
    navigate("/add-expense");
  };

  const handleViewExpenses = () => {
    navigate("/view-expenses");
  };

  return (
    <div className="dashboard-container">
      <div className="logout-bar">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <h2>Welcome to Dashboard</h2>
        <button className="add-expense-btn" onClick={handleAddExpense}>
          Add Expense
        </button>
        <button className="view-expense-btn" onClick={handleViewExpenses}>
          View Expenses
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
