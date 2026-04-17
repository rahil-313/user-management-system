import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/users" element={
          <ProtectedRoute roles={["admin","manager"]}>
            <Users />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/create-user" element={
          <ProtectedRoute roles={["admin"]}>
            <CreateUser />
          </ProtectedRoute>
        } />

        <Route path="/edit-user/:id" element={
          <ProtectedRoute roles={["admin","manager"]}>
            <EditUser />
          </ProtectedRoute>
        } />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;