import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const EditUser = () => {
  const { id } = useParams();
  const { user: loggedUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/users/${id}`, form);
      alert("User updated successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error updating user");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">

          <h2>Edit User</h2>

          {/* Name */}
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Email (Admin only) */}
          {loggedUser?.role === "admin" && (
            <>
              <label>Email</label>
              <input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </>
          )}

          {/* Role (Admin only) */}
          {loggedUser?.role === "admin" && (
            <>
              <label>Role</label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </>
          )}

          {/* Status (Admin only - recommended for your project) */}
          {loggedUser?.role === "admin" && (
            <>
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </>
          )}

          <button
            onClick={handleUpdate}
            style={{ marginTop: "15px" }}
          >
            Update User
          </button>

        </div>
      </div>
    </>
  );
};

export default EditUser;