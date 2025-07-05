import React, { useEffect, useState } from "react";
import axios from "axios";
import "./expensesummary.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ExpenseSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://expense-tracker-backend-production-8795.up.railway.app/api/expenses/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  const chartData = [
    { name: "Total", value: summary.total },
    { name: "Avg/Day", value: summary.avgPerDay },
    { name: "Avg/Month", value: summary.avgPerMonth },
    { name: "Highest", value: summary.highest },
    { name: "Lowest", value: summary.lowest },
  ];

  return (
    <div className="summary-container">
      <h2>Expense Summary</h2>
      <div className="summary-stats">
        <p><strong>Total Expenses:</strong> ₹{summary.total.toFixed(2)}</p>
        <p><strong>Average per Day:</strong> ₹{summary.avgPerDay.toFixed(2)}</p>
        <p><strong>Average per Month:</strong> ₹{summary.avgPerMonth.toFixed(2)}</p>
        <p><strong>Highest Expense:</strong> ₹{summary.highest}</p>
        <p><strong>Lowest Expense:</strong> ₹{summary.lowest}</p>
      </div>

      <div className="summary-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseSummary;
