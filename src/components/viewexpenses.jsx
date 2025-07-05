import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewExpenses.css";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    keyword: "",
  });
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [minAmount, setMinAmount] = useState("");
const [maxAmount, setMaxAmount] = useState("");
const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams(filters).toString();

      const res = await axios.get(`https://expense-tracker-backend-production-8795.up.railway.app/api/expenses?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data.expenses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleFilter = (e) => {
  e.preventDefault();

  let filtered = [...expenses];

  if (filters.startDate) {
    filtered = filtered.filter(
      (exp) => new Date(exp.date) >= new Date(filters.startDate)
    );
  }

  if (filters.endDate) {
    filtered = filtered.filter(
      (exp) => new Date(exp.date) <= new Date(filters.endDate)
    );
  }

  if (filters.minAmount) {
    filtered = filtered.filter((exp) => exp.amount >= filters.minAmount);
  }

  if (filters.maxAmount) {
    filtered = filtered.filter((exp) => exp.amount <= filters.maxAmount);
  }

  if (filters.titleKeyword) {
    filtered = filtered.filter((exp) =>
      exp.title.toLowerCase().includes(filters.titleKeyword.toLowerCase())
    );
  }

  setExpenses(filtered);
};

  const handleDelete = async (id) => {
    console.log("Delete clicked for ID:", id);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://expense-tracker-backend-production-8795.up.railway.app/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (expense) => {
    navigate(`/edit-expense/${expense._id}`);
  };
  const handleResetFilters = async () => {
  setStartDate("");
  setEndDate("");
  setMinAmount("");
  setMaxAmount("");
  setKeyword("");

  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://expense-tracker-backend-production-8795.up.railway.app/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setExpenses(res.data.expenses);
  } catch (err) {
    console.error("Failed to reset filters:", err);
  }
};

  return (
    <div className="view-expenses-container">
      <h2 className="expenses-title">All Expenses</h2>

      {/* 🔍 Filter Form */}
      <form className="filter-form" onSubmit={handleFilter}>
  <div className="filter-field">
    <label className="filter-label">Start Date:</label>
    <input
      type="date"
      value={filters.startDate}
      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
    />
  </div>
  <div className="filter-field">
    <label className="filter-label">End Date:</label>
    <input
      type="date"
      value={filters.endDate}
      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
    />
  </div>
  <div className="filter-field">
    <label>Min Amount:</label>
    <input
      type="number"
      placeholder="Min"
      value={filters.minAmount}
      onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
    />
  </div>
  <div className="filter-field">
    <label>Max Amount:</label>
    <input
      type="number"
      placeholder="Max"
      value={filters.maxAmount}
      onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
    />
  </div>
  <div className="filter-field">
    <label>Title Keyword:</label>
    <input
      type="text"
      placeholder="Keyword"
      value={filters.titleKeyword}
      onChange={(e) => setFilters({ ...filters, titleKeyword: e.target.value })}
    />
  </div>
  <button type="submit">Apply Filters</button>
  <button type="button" className="reset-btn" onClick={handleResetFilters}>
  Reset Filters
</button>
<button
  onClick={() => navigate("/expense-summary")}
  className="summary-btn"
>
  View Summary
</button>

</form>

      <div className="expenses-list">
        {Array.isArray(expenses) && expenses.length > 0 ? (
          expenses.map((expense) => (
            <div className="expense-card" key={expense._id}>
              <div className="expense-field">
                <span className="label">Title:</span>
                <span className="value">{expense.title}</span>
              </div>
              <div className="expense-field">
                <span className="label">Amount:</span>
                <span className="value">₹{expense.amount}</span>
              </div>
              <div className="expense-field">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(expense.date).toLocaleDateString()}
                </span>
              </div>
              <div className="expense-buttons">
                <button onClick={() => handleEdit(expense)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-expenses">No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewExpenses;
