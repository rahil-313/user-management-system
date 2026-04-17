import { useEffect, useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    API.get("/users/me").then((res) => {
      setName(res.data.name);
    });
  }, []);

  const handleUpdate = async () => {
    try {
      await API.put("/users/me", { name, password });
toast.success("Profile updated");
        setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ textAlign: "center" }}>My Profile</h2>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;