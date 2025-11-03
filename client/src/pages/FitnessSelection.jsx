// src/pages/FitnessLevelSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserFitnessLevel, assignWorkoutRoutine } from "../utils/API";

export default function FitnessSelection() {
  const [fitnessLevel, setFitnessLevel] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Update fitness level
      const { user } = await updateUserFitnessLevel({ fitness_level: fitnessLevel });
      if (!user) throw new Error("No user returned from API");

      localStorage.setItem("user", JSON.stringify(user));
      console.log("✅ Fitness level updated:", user.fitness_level);

      // 2️⃣ Assign workout routine based on goal + fitness level
      const routineResponse = await assignWorkoutRoutine();
      console.log("🏋️ Routine assigned:", routineResponse.routine);

      // 3️⃣ Save routine and mark as complete
      const updatedUser = { ...user, workout_routine: routineResponse.routine, profileComplete: true };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 4️⃣ Navigate to home page
      navigate("/home");
    } catch (err) {
      console.error("❌ Error updating fitness level:", err);
      setError("Failed to update fitness level. Please try again.");
    }
  };

  return (
    <div className="fitness-selection">
      <h2>Select Your Fitness Level</h2>
      <form onSubmit={handleSubmit}>
        <select value={fitnessLevel} onChange={(e) => setFitnessLevel(e.target.value)} required>
          <option value="">Select level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit">Finish</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

