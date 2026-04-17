import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    admins: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/users?limit=1000");

      const users = res.data.users;

      setStats({
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === "active").length,
        managers: users.filter(u => u.role === "manager").length,
        admins: users.filter(u => u.role === "admin").length
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        
       
        <div className="card" style={{ marginBottom: "20px", marginTop:"100px" }}>
          <h2>Welcome, {user?.name}</h2>
          <p>Role: <strong>{user?.role}</strong></p>
        </div>

        {/*  Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "20px"
          }}
        >
          <div className="card">
            <h3>Total Users</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {stats.totalUsers}
            </p>
          </div>

          <div className="card">
            <h3>Active Users</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981" }}>
              {stats.activeUsers}
            </p>
          </div>

          <div className="card">
            <h3>Admins</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#ef4444" }}>
              {stats.admins}
            </p>
          </div>
          <div className="card">
            <h3>Manager</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "rgb(245, 158, 11)" }}>
              {stats.managers}
            </p>
          </div>
        </div>

       { /* Quick Actions */}
        <div className="card">
          <h3>Quick Actions</h3>

          <div style={{ marginTop: "10px" }}>
            {user?.role === "admin" && (
              <button onClick={() => window.location.href = "/create-user"}>
                Create New User
              </button>
            )}

            <button onClick={() => window.location.href = "/users"}>
              View Users
            </button>

            <button onClick={() => window.location.href = "/profile"}>
              My Profile
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;