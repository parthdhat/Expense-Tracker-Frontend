import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    const fetchExpense = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://expense-tracker-backend-production-8795.up.railway.app/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const found = res.data.expenses.find((exp) => exp._id === id);
        if (found) {
          setExpense({
            title: found.title,
            amount: found.amount,
            date: new Date(found.date).toISOString().substr(0, 10),
          });
        }
      } catch (err) {
        console.error("Error fetching expense:", err);
      }
    };

    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`https://expense-tracker-backend-production-8795.up.railway.app/api/expenses/${id}`, expense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Expense updated!");
      navigate("/view-expenses");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update expense.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", paddingTop: "40px" }}>
      <h2>Edit Expense</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={expense.title}
            onChange={handleChange}
            required
            type="text"
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
            type="number"
          />
        </div>
        <div>
          <label>Date</label>
          <input
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
            type="date"
          />
        </div>
        <button type="submit">Update Expense</button>
      </form>
    </div>
  );
};

export default EditExpense;
