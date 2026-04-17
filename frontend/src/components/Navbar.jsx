import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "#28153e",
      color: "white",
        flexWrap: "wrap",
      position: "fixed",
      width: "100%",
      marginTop: "-3px",
      height:"45px"
    }}>
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