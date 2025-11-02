// src/pages/GoalSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateUserGoal,
  updateUserFitnessLevel,
  assignWorkoutRoutine,
} from "../utils/API";

export default function GoalSelection() {
  const [goal, setGoal] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Update user goal
      await updateUserGoal(goal);

      // ✅ Update fitness level
      await updateUserFitnessLevel(fitnessLevel);

      // ✅ Assign a matching workout routine
      const response = await assignWorkoutRoutine();
      console.log("🏋️ Routine assigned:", response);

      // ✅ Save user info locally (optional)
      const updatedUser = response.user || response.routine?.user;
      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      // ✅ Navigate to home page
      navigate("/home");
    } catch (err) {
      console.error("❌ Error in goal setup:", err);
      setError("Failed to set up your workout routine. Please try again.");
    }
  };

  return (
    <div className="goals-setup">
      <h2>Select Your Goal and Fitness Level</h2>

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
          </select>
        </div>

        <div>
          <label>Fitness Level:</label>
          <select
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            required
          >
            <option value="">--Select Level--</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button type="submit">Get My Routine</button>
      </form>
    </div>
  );
}


