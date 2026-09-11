import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import VerifyJob from "../pages/VerifyJob";
import ScanHistory from "../pages/ScanHistory";
import OfferLetter from "../pages/OfferLetter";
import RecruiterVerification from "../pages/RecruiterVerification";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Verify Job */}
      <Route
        path="/verify-job"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <VerifyJob />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Scan History */}
      <Route
        path="/scan-history"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ScanHistory />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Offer Letter */}
      <Route
        path="/offer-letter"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <OfferLetter />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Recruiter Verification */}
      <Route
        path="/recruiter-verification"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RecruiterVerification />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;