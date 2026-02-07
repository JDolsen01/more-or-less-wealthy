import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Protected from "./pages/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Recurrings from "./pages/Recurring";
import Budgets from "./pages/Budgets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/transactions"
          element={
            <Protected>
              <Transactions />
            </Protected>
          }
        />
        <Route
          path="/recurring"
          element={
            <Protected>
              <Recurrings />
            </Protected>
          }
        />
        <Route
          path="/budgets"
          element={
            <Protected>
              <Budgets />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
