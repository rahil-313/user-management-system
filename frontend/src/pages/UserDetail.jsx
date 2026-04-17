import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card" style={{marginTop: "100px"}}>
          <h2>User Details</h2>

          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.status}</p>

          <hr />

          <h3>Audit Info</h3>

          <p>
            <strong>Created By:</strong>{" "}
            {user.createdBy?.name} ({user.createdBy?.email})
          </p>

          <p>
            <strong>Updated By:</strong>{" "}
            {user.updatedBy?.name} ({user.updatedBy?.email})
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserDetail;