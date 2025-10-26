import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWorkoutRoutinesByGoal, assignWorkoutRoutine } from "../utils/API";

export default function GoalSelection() {
  const [goal, setGoal] = useState("");
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  const handleGoalSelect = async (selectedGoal) => {
    setGoal(selectedGoal);
    try {
      const data = await fetchWorkoutRoutinesByGoal(selectedGoal);
      setRoutines(data);
    } catch (err) {
      console.error("Error fetching routines:", err);
    }
  };

  const handleRoutineSelect = async (routineId) => {
    try {
      await assignWorkoutRoutine(routineId);
      console.log("🏋️ Routine assigned!");
      navigate("/home"); // go to home page
    } catch (err) {
      console.error("❌ Failed to assign routine:", err);
    }
  };

  return (
    <div className="goal-selection">
      <h2>Select Your Goal</h2>
      <div>
        <button onClick={() => handleGoalSelect("Lean")}>Lean</button>
        <button onClick={() => handleGoalSelect("Bulk")}>Bulk</button>
        <button onClick={() => handleGoalSelect("Strength")}>Strength</button>
      </div>

      {routines.length > 0 && (
        <div>
          <h3>Available Routines for {goal}:</h3>
          {routines.map((r) => (
            <div key={r._id} className="routine-card">
              <h4>{r.name}</h4>
              <p>Level: {r.fitness_level}</p>
              <p>Duration: {r.duration}</p>
              <button onClick={() => handleRoutineSelect(r._id)}>Select</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}