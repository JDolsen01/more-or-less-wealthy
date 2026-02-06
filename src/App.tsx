import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Wrapper from "./pages/Wrapper";
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
            <Wrapper>
              <Dashboard />
            </Wrapper>
          }
        />
        <Route
          path="/transactions"
          element={
            <Wrapper>
              <Transactions />
            </Wrapper>
          }
        />
        <Route
          path="/recurring"
          element={
            <Wrapper>
              <Recurrings />
            </Wrapper>
          }
        />
        <Route
          path="/budgets"
          element={
            <Wrapper>
              <Budgets />
            </Wrapper>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
