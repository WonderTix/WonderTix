import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Accounts from "./components/Accounts/Accounts.jsx";
import Contacts from "./components//Contacts/Contacts.jsx";
import Tasks from "./components//Tasks/Tasks.jsx";
import Reporting from "./components//Reporting/Reporting.jsx";
import ProtectedRoute from "./components/Authentication/protected-route";

export default function App() {
  return (
    <>
      <Navigation />
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          }
        >
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        >
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/reporting"
          element={
            <ProtectedRoute>
              <Reporting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
