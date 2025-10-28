import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { updateUserProfile } from "../utils/API"; // ✅ you'll make this API function

function ProfileSetup() {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await updateUserProfile(formData);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("✅ Profile updated successfully");
      navigate("/goals"); // move to goal selection page
    } catch (err) {
      console.error("❌ Error updating profile:", err);
    }
  };

  return (
    <div className="profile-setup">
      <h2>Set Up Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <input
          name="height"
          value={formData.height}
          onChange={handleChange}
          placeholder="Height"
          required
        />
        <input
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
          required
        />
        <button type="submit">Find Routines</button>
      </form>
    </div>
  );
}


export default ProfileSetup;