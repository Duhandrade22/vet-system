import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AnimalDetails } from "./pages/AnimalDetails/AnimalDetails";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { OwnerDetails } from "./pages/OwnerDetails/OwnerDetails";
import { RecordDetails } from "./pages/RecordDetails/RecordDetails";
import { Register } from "./pages/Register/Register";
import { authService } from "./services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return authService.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return !authService.isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/" replace />
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owners/:id"
          element={
            <ProtectedRoute>
              <OwnerDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/animals/:id"
          element={
            <ProtectedRoute>
              <AnimalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records/:id"
          element={
            <ProtectedRoute>
              <RecordDetails />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
