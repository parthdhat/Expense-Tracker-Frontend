import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './components/frontpage';
import Login from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/protectedroute';
import AddExpense from './components/addexpense'
import ViewExpenses from './components/viewexpenses'
import EditExpense from './components/editexpense'
import ExpenseSummary from "./components/expensesummary"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/view-expenses" element={<ViewExpenses />} />
         <Route path="/edit-expense/:id" element={<EditExpense />} />
<Route path="/expense-summary" element={<ExpenseSummary />} />

      </Routes>
    </Router>
  );
}

export default App;
