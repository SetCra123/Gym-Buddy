// src/pages/GoalSelection.jsx
import { useNavigate } from "react-router-dom";
import { updateUserGoal } from "../utils/API";

export default function GoalSelection() {
  const navigate = useNavigate();

  const handleGoalSelect = async (goal) => {
    try {
      await updateUserGoal(goal);
      console.log(`🎯 Goal updated to ${goal}`);
      navigate("/fitness-level");
    } catch (err) {
      console.error("❌ Error updating goal:", err);
    }
  };

  return (
    <div className="goal-selection">
      <h2>Select Your Goal</h2>
      <button onClick={() => handleGoalSelect("Lean")}>Lean</button>
      <button onClick={() => handleGoalSelect("Bulk")}>Bulk</button>
      <button onClick={() => handleGoalSelect("Strength")}>Strength</button>
    </div>
  );
}
