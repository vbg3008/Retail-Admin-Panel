import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ClientsPage from "./pages/ClientsPage";

// Check authentication status from localStorage
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/auth"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <AuthPage />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute>
              <ClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
