import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addexpense.css";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please log in first.");
      return;
    }

    try {
      const response = await fetch("https://expense-tracker-backend-production-8795.up.railway.app/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount, date }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Expense added successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(data.message || "Failed to add expense.");
      }
    } catch (error) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="add-expense-container">
      <form className="expense-form" onSubmit={handleSubmit}>
        <h2>Add Expense</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Submit</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddExpense;
