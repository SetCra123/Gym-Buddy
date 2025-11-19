// src/pages/GoalSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateUserGoal,
} from "../utils/API";

export default function GoalSelection() {
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const  user  = await updateUserGoal(goal);
      if (!user) throw new Error("No user returned from API");

      localStorage.setItem("user", JSON.stringify(user));
      console.log("✅ Goal updated:", user.goal);

      // Move to fitness level selection
      navigate("/fitness-level");
    } catch (err) {
      console.error("❌ Error in goal setup:", err);
      setError("Failed to set up your workout routine. Please try again.");
    }
  };

  return (
    <div className="goals-setup goal-page">
      
     <div className="selection-card">
      <h2>Select Your Goal!</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Goal:</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
            <option value="">--Select Goal--</option>
            <option value="lean">Lean</option>
            <option value="strength">Strength</option>
            <option value="bulk">Bulk</option>
            <option value="toned">Toned</option>
            <option value="endurance">Endurance</option>
            <option value="sexy-slender">Sexy-Slender</option>
            <option value="thick-fit">Thick-Fit</option>
            <option value="slim-tone">Slim-Tone</option>
            <option value="booty-build">Booty-Build</option>
          </select>
        </div>

        <button className="main-btn" type="submit">Submit</button>
      </form>
     </div>
    </div>
  );
}


