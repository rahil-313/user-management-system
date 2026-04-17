import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const handleSubmit = async () => {
    try {
      await API.post("/users", form);
      toast.success("User created successfully");

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        role: "user"
      });

    } catch (err) {
     toast.error(err.response?.data?.message || "Error creating user");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Create User</h2>

          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

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

          <button style={{ marginTop: "10px" }} onClick={handleSubmit}>
            Create User
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;