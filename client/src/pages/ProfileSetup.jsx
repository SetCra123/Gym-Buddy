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
      const updatedUser = await updateUserProfile(formData);
      console.log("✅ Response from API:", updatedUser);
  
      if (!updatedUser) {
        throw new Error("No user returned from API");
      }
  
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("✅ Profile updated successfully:", updatedUser);
      navigate("/goals");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile. Check console for details.");
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default ProfileSetup;