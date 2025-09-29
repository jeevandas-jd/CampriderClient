import { useEffect, useState } from "react";
import { getProfile } from "../api/auth";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getProfile(token).then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>ID: {profile.message}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default Profile;
