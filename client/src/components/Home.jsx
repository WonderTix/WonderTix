import React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Accounts from "./Accounts/Accounts";
import Contacts from "./Contacts/Contacts";
import Dashboard from "./Dashboard";
import Reporting from "./Reporting/Reporting";
import Tasks from "./Tasks/Tasks";
import Auth from "../utils/Auth";

export default function Home() {
  return (
      <Routes>
        <Route path="/login" element={<Dashboard />} />
        <Route element={<Auth />}>
          <Route path="/accounts" element={<Accounts />}>
            <Route path=":id" element={<Accounts />} />
          </Route>
          <Route path="/contacts" element={<Contacts />}>
            <Route path=":id" element={<Contacts />} />
          </Route>
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        <Route path="*" element={<Dashboard />} />
      </Routes>
  );
}
