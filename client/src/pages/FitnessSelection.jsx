// src/pages/FitnessLevelSelection.jsx
import { useNavigate } from "react-router-dom";
import { updateUserFitnessLevel, assignWorkoutRoutine } from "../utils/API";

export default function FitnessLevelSelection() {
  const navigate = useNavigate();

  const handleLevelSelect = async (level) => {
    try {
      await updateUserFitnessLevel(level);
      console.log(`💪 Fitness level updated to ${level}`);

      // Assign a routine automatically based on goal + level
      await assignWorkoutRoutine();
      navigate("/home");
    } catch (err) {
      console.error("❌ Error updating fitness level:", err);
    }
  };

  return (
    <div className="fitness-level-selection">
      <h2>Select Your Fitness Level</h2>
      <button onClick={() => handleLevelSelect("Beginner")}>Beginner</button>
      <button onClick={() => handleLevelSelect("Intermediate")}>Intermediate</button>
      <button onClick={() => handleLevelSelect("Advanced")}>Advanced</button>
    </div>
  );
}
