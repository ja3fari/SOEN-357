import React from "react";
import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { FocusSession } from "./pages/FocusSession";
import { SessionSummary } from "./pages/SessionSummary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Dashboard
  },
  {
    path: "/focus",
    Component: FocusSession
  },
  {
    path: "/summary",
    Component: SessionSummary
  }
]);