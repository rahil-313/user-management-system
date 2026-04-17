import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";




const Users = () => {
  const { user: loggedUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
          const res = await API.get(
        `/users?search=${search}&page=${page}&limit=5&role=${roleFilter}&status=${statusFilter}`
      );
      setUsers(res.data.users);
      setPages(res.data.pages);
    } catch (err) {
      console.log(err);
    }
  };

const handleSearch = () => {
  setPage(1);
  fetchUsers();
};

  const handleDelete = async (id) => {
   toast.success("User Deactivated successfully");

    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2 style={{ marginTop: "5%" }}>User Management</h2>

          {/*  Search + Create Button Row */}
     {/*  Search + Filters Layout */}
<div style={{ marginBottom: "20px" }}>
  
  {/*  Search Row */}
  <div style={{ marginBottom: "10px" }}>
    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ width: "98%" }}
    />
  </div>

  {/*  Filters Row */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px"
    }}
  >
    {/* Left side: Filters */}
    <div style={{ display: "flex", gap: "10px" }}>
      
      {/* Role Filter */}
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)} style={{ marginTop:"-10px", height:"40px", flexWrap: "wrap", }}
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="user">User</option>
      </select>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)} style={{ marginTop:"-10px", height:"40px",flexWrap: "wrap", }}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Apply Button */}
      <button onClick={handleSearch}  style={{ height:"30px", marginTop:"-5px" }}>
        Apply
      </button>
    </div>

    {/* Right side: Create User */}
    {loggedUser?.role === "admin" && (
      <Link to="/create-user">
        <button style={{ marginBottom:"60px" }} >Create User</button>
      </Link>
    )}
  </div>
</div>

          {/* Table */}
          <div className="table-wrapper">
          <table style={{ marginTop: "15px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>

                    <td>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          background:
                            u.role === "admin"
                              ? "#ef4444"
                              : u.role === "manager"
                              ? "#f59e0b"
                              : "#10b981",
                          color: "white"
                        }}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "5px",
                          background:
                            u.status === "active"
                              ? "#10b981"
                              : "#6b7280",
                          color: "white"
                        }}
                      >
                        {u.status}
                      </span>
                    </td>
                        
                    <td>

                        {/*  View (for admin & manager) */}
                        {(loggedUser?.role === "admin" ||
                          loggedUser?.role === "manager") && (
                          <Link to={`/users/${u._id}`}>
                            <button style={{ marginRight: "5px", background:"orange " }} className="action-buttons" >View</button>
                          </Link>
                        )}

                      {/*  Edit */}
                      {(loggedUser?.role === "admin" ||
                        (loggedUser?.role === "manager" &&
                          u.role !== "admin")) && (
                        <Link to={`/edit-user/${u._id}`}>
                          <button className="action-buttons">Edit</button>
                        </Link>
                      )}

                      {/* Delete */}
                      {loggedUser?.role === "admin" && (
                            <button
                            onClick={() => handleDelete(u._id)}
                            style={{ marginLeft: "5px", background: "#dc2626" }} className="action-buttons"
                          >
                            Deactivate
                          </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
</div>
          {/*Pagination */}
          <div style={{ marginTop: "15px" }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <span style={{ margin: "0 10px" }}>
              Page {page} of {pages}
            </span>

            <button
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;