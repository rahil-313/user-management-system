import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#1f2937",
    color: "white",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000
  }}
>
      <div>
        <strong>Admin Panel</strong>
      </div>

      <div>
        <Link to="/dashboard" style={{ color: "white", marginRight: "100px",   flexWrap: "wrap",textDecoration: "none"}}>
          Dashboard
        </Link>

        {(user?.role === "admin" || user?.role === "manager") && (
          <Link to="/users" style={{ color: "white", marginRight: "100px",   flexWrap: "wrap", textDecoration: "none" }}>
            Users
          </Link>
        )}

        <Link to="/profile" style={{ color: "white", marginRight: "100px",  flexWrap: "wrap", textDecoration: "none" }}>
          Profile
        </Link>

        <button onClick={logout} style={{ marginRight: "100px",   flexWrap: "wrap", }}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;