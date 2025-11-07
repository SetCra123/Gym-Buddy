import { useEffect, useState } from "react";
import { getUsers, updateUserProfile, assignWorkoutRoutine } from "../utils/API"; // ✅ make sure these exist
import "../Home.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    goal: "",
    fitness_level: "",
  });

  // ✅ Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    // ✅ Optionally refresh from API to keep it in sync
    async function refreshUser() {
      try {
        const freshUser = await getUsers();
        if (freshUser) {
          setUser(freshUser);
          localStorage.setItem("user", JSON.stringify(freshUser));
        }
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    }

    refreshUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  const routine = user.workout_routine?.[0] || user.workout_routine;

  // ✅ Open modal and preload user info
  const handleEditClick = () => {
    setUpdatedProfile({
      goal: user.goal?.[0] || user.goal || "",
      fitness_level: user.fitness_level?.[0] || user.fitness_level || "",
    });
    setShowModal(true);
  };

  // ✅ Handle input changes in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Save profile changes and reassign new routine
  const handleSave = async () => {
    try {
      console.log("📤 Updating profile:", updatedProfile);

      // 1️⃣ Update user info (goal / fitness)
      const updatedUser = await updateUserProfile(updatedProfile);
      console.log("✅ Updated user:", updatedUser);

      // 2️⃣ Reassign new workout routine
      const newRoutineResponse = await assignWorkoutRoutine();
      console.log("🏋️ New routine assigned:", newRoutineResponse);

      const updatedUserWithRoutine = {
        ...updatedUser,
        workout_routine: [newRoutineResponse.routine],
      };

      // 3️⃣ Save new data to localStorage and state
      localStorage.setItem("user", JSON.stringify(updatedUserWithRoutine));
      setUser(updatedUserWithRoutine);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error updating profile or reassigning routine:", err);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome, {user.username}!</h1>

      {routine ? (
        <div className="routine-container">
          <h2>Your Assigned Routine: {routine.name}</h2>
          <p>
            <strong>Goal:</strong> {routine.goal} | <strong>Level:</strong>{" "}
            {routine.fitness_level}
          </p>
          <p>
            <em>Duration:</em> {routine.duration} minutes
          </p>
          {routine.notes && <p>{routine.notes}</p>}

          <h3>Exercises:</h3>
          <ul className="exercise-list">
            {routine.exercises && routine.exercises.length > 0 ? (
              routine.exercises.map((exercise) => (
                <li key={exercise._id} className="exercise-item">
                  <details>
                    <summary className="exercise-summary">
                      <strong>{exercise.name}</strong> —{" "}
                      <em>{exercise.muscleGroup}</em>
                    </summary>
                    <div className="exercise-details">
                      {exercise.description && (
                        <p>{exercise.description}</p>
                      )}
                      <p>
                        <strong>Reps:</strong> {exercise.reps || "N/A"} |{" "}
                        <strong>Sets:</strong> {exercise.sets || "N/A"}
                      </p>
                      <p>
                        <strong>Equipment:</strong>{" "}
                        {exercise.equipment || "None"}
                      </p>
                      {exercise.calories_burned && (
                        <p>
                          <strong>Calories Burned:</strong>{" "}
                          {exercise.calories_burned}
                        </p>
                      )}
                    </div>
                  </details>
                </li>
              ))
            ) : (
              <li>No exercises found.</li>
            )}
          </ul>
        </div>
      ) : (
        <p>You don't have a routine assigned yet.</p>
      )}
    

      {/* ✅ Edit Profile Button */}
      <button className="edit-profile-btn" onClick={handleEditClick}>
        ✏️ Edit Profile
      </button>

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Edit Your Profile</h2>
            <label>
              Goal:
              <select
                name="goal"
                value={updatedProfile.goal}
                onChange={handleChange}
              >
                <option value="">Select a goal</option>
                <option value="lean">Lean</option>
                <option value="toned">Toned</option>
                <option value="muscular">Muscular</option>
              </select>
            </label>

            <label>
              Fitness Level:
              <select
                name="fitness_level"
                value={updatedProfile.fitness_level}
                onChange={handleChange}
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <div className="modal-buttons">
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setShowModal(false)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
