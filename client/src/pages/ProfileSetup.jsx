import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { updateUserProfile, assignWorkoutRoutine } from "../utils/API"; // ✅ you'll make this API function

export default function ProfileSetup() {
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    age: "",
    height: "",
    weight: "",
    goal: "",
  });

  const [availableRoutines, setAvailableRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [step, setStep] = useState(1); // 1 = profile form, 2 = routine selection

  // ✅ handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // ✅ Step 1: Update profile and get routines
  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUserProfile(profileData);
      console.log("Profile updated:", res);

      if (res.availableRoutines && res.availableRoutines.length > 0) {
        setAvailableRoutines(res.availableRoutines);
        setStep(2); // go to step 2
      } else {
        alert("No routines found for this goal.");
      }
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  // ✅ Step 2: Assign chosen workout routine
  const handleAssignRoutine = async () => {
    if (!selectedRoutine) return alert("Please select a routine first.");

    try {
      const res = await assignWorkoutRoutine(selectedRoutine);
      console.log("Routine assigned:", res);

      // ✅ Save updated user info locally
      const user = JSON.parse(localStorage.getItem("user")) || {};
      localStorage.setItem("user", JSON.stringify({ ...user, workoutRoutine: res.user.workoutRoutine }));

      alert("Workout routine assigned successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to assign workout routine.");
    }
  };

  return (
    <div className="profile-setup-container">
      {step === 1 && (
        <form onSubmit={handleSubmitProfile}>
          <h2>Complete Your Profile</h2>

          <input
            name="age"
            value={profileData.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <input
            name="height"
            value={profileData.height}
            onChange={handleChange}
            placeholder="Height"
          />
          <input
            name="weight"
            value={profileData.weight}
            onChange={handleChange}
            placeholder="Weight"
          />

          <select
            name="goal"
            value={profileData.goal}
            onChange={handleChange}
          >
            <option value="">Select Goal</option>
            <option value="Lean">Lean</option>
            <option value="Strength">Strength</option>
            <option value="Bulk">Bulk</option>
            <option value="Toned">Toned</option>
          </select>

          <button type="submit">Find Routines</button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h2>Select a Routine</h2>
          {availableRoutines.map((routine) => (
            <div key={routine._id}>
              <input
                type="radio"
                id={routine._id}
                name="routine"
                value={routine._id}
                onChange={(e) => setSelectedRoutine(e.target.value)}
              />
              <label htmlFor={routine._id}>
                {routine.fitness_level} – {routine.duration}
              </label>
            </div>
          ))}
          <button onClick={handleAssignRoutine}>Assign Routine</button>
        </div>
      )}

      {showAlert && <p className="error">Error updating profile. Try again.</p>}
    </div>
  );
}