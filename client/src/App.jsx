import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CssBaseline from "@mui/material/CssBaseline";
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
        <Route path="/" element={<Home />} />
        <Route
          path="/accounts"
          element={<ProtectedRoute component={Accounts} />}
        >
          <Route path=":id" element={<ProtectedRoute component={Accounts} />} />
        </Route>
        <Route
          path="/contacts"
          element={<ProtectedRoute component={Contacts} />}
        >
          <Route path=":id" element={<ProtectedRoute component={Contacts} />} />
        </Route>
        <Route
          path="/reporting"
          element={<ProtectedRoute component={Reporting} />}
        />
        <Route path="/tasks" element={<ProtectedRoute component={Tasks} />} />
      </Routes>
    </>
  );
}
