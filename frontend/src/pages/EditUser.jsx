// src/pages/EditUser.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const EditUser = () => {
  const { id } = useParams();
  const { user: loggedUser } = useContext(AuthContext);

  const [form, setForm] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await API.get(`/users/${id}`);
    setForm(res.data);
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/users/${id}`, form);
      alert("User updated");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />

      <h2 style={{marginTop: "100px"}}>Edit User</h2>

      {/* Name */}
      <input
        value={form.name || ""}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      {/*  Email (ONLY ADMIN) */}
      {loggedUser?.role === "admin" && (
        <input
          value={form.email || ""}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      )}

      {/*  Role (ONLY ADMIN) */}
      {loggedUser?.role === "admin" && (
        <select
          value={form.role || ""}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button onClick={handleUpdate}>Update</button>
    </>
  );
};

export default EditUser;