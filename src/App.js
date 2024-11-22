import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { changeIsMobile } from "./features/userSlice";
import AccountScreen from "./screens/AccountScreen";
import BudgetScreen from "./screens/BudgetScreen";
import DashboardScreen from "./screens/DashboardScreen";
import GoalScreen from "./screens/GoalScreen";
import LandingScreen from "./screens/LandingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReportScreen from "./screens/ReportScreen";
import TransactionScreen from "./screens/TransactionScreen";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleResize = () => {
      dispatch(changeIsMobile(window.innerWidth <= 768)); // Adjust the breakpoint as needed
    };

    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Call handleResize once on component mount
    handleResize();
    console.log(window.innerWidth <= 768);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [window]);

  return (
    <HashRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AlreadyLoggedin>
              <LandingScreen></LandingScreen>
            </AlreadyLoggedin>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/account"
          element={
            <RequireAuth>
              <AccountScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/report"
          element={
            <RequireAuth>
              <ReportScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/goal"
          element={
            <RequireAuth>
              <GoalScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/transaction"
          element={
            <RequireAuth>
              <TransactionScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProfileScreen />
            </RequireAuth>
          }
        />
        <Route
          path="/budget"
          element={
            <RequireAuth>
              <BudgetScreen />
            </RequireAuth>
          }
        />
        <Route path="/*" element={<p>Page not found</p>} />
      </Routes>
    </HashRouter>
  );
}

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  if (token === null) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

function AlreadyLoggedin({ children }) {
  const token = localStorage.getItem("token");
  console.log(token);
  return token !== null ? <Navigate to="/dashboard" /> : children;
}

export default App;
