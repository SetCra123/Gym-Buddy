import { useEffect, useState } from "react";
import { getUsers, updateUserProfile, assignWorkoutRoutine } from "../utils/API";
import { logout } from "../utils/API";
import "../Home.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    goal: "",
    fitness_level: "",
  });

  // Load user from localStorage or fetch from API
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
          setUser(storedUser);

          // If user has goal but no routine, assign one
          if (
            storedUser.goal &&
            (!storedUser.workout_routine || storedUser.workout_routine.length === 0)
          ) {
            const newRoutine = await assignWorkoutRoutine();
            const updatedUser = { ...storedUser, workout_routine: [newRoutine.routine] };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }
        } else {
          // Fetch from API if not in localStorage
          const apiUser = await getUsers();
          if (apiUser) {
            // If no routine, assign one based on goal
            let userData = apiUser;
            if (!apiUser.workout_routine || apiUser.workout_routine.length === 0) {
              const newRoutine = await assignWorkoutRoutine();
              userData = { ...apiUser, workout_routine: [newRoutine.routine] };
            }
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      } catch (err) {
        console.error("❌ Error loading user:", err);
      }
    };

    loadUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  const routine = user.workout_routine?.[0] || user.workout_routine;

  const toggleExercise = (id) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  const handleEditClick = () => {
    setUpdatedProfile({
      goal: user.goal || "",
      fitness_level: user.fitness_level || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log("📤 Updating profile:", updatedProfile);

      // 1️⃣ Update user info
      const updatedUser = await updateUserProfile(updatedProfile);
      console.log("✅ Updated user:", updatedUser);

      // 2️⃣ Reassign new workout routine
      const newRoutineResponse = await assignWorkoutRoutine();
      console.log("🏋️ New routine assigned:", newRoutineResponse);

      const updatedUserWithRoutine = {
        ...updatedUser,
        workout_routine: [newRoutineResponse.routine],
      };

      // 3️⃣ Save and update UI
      localStorage.setItem("user", JSON.stringify(updatedUserWithRoutine));
      setUser(updatedUserWithRoutine);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error updating profile or assigning routine:", err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="home-page">
      <div className="user-info">
        <h1>Welcome, {user.username}!</h1>
        <h3>{user.height}</h3>
        <h3>{user.weight}</h3>
      </div>

      {routine ? (
        <div className="routine-flex-container">
          <div className="routine-info">
         
          <h2>Your Assigned Routine: {routine.name}</h2>
           {/* Left Side - Routine Info */}
            <div style = {{ flex: 1}}>
              <p>
                <strong>Goal:</strong> {routine.goal} |{" "}
                <strong>Level:</strong> {routine.fitness_level}
              </p>
              <p><em>Duration:</em> {routine.duration}</p>
            </div>
          <h3>Exercises</h3>
          <div className="exercise-list">
            {routine.exercises && routine.exercises.length > 0 ? (
              routine.exercises.map((exercise) => {
                const isOpen = expandedExercise === exercise._id;
                return (
                  <motion.div
                    key={exercise._id}
                    layout
                    className="exercise-card"
                    initial={{ borderRadius: 12 }}
                    transition={{ layout: { duration: 0.3, type: "spring" } }}
                  >
                    <motion.div
                      layout="position"
                      className="exercise-header"
                      onClick={() => toggleExercise(exercise._id)}
                    >
                      <strong>{exercise.name}</strong> —{" "}
                      <em>{exercise.muscleGroup}</em>
                      <motion.span
                        className="arrow"
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        ▶
                      </motion.span>
                    </motion.div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="exercise-details"
                        >
                          {exercise.description && <p>{exercise.description}</p>}
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <p>No exercises found.</p>
            )}
            </div>
            </div>
            
            {/* Right Side - Workout Image */}
            <motion.img
                src="../src/assets/3d-cartoon-fitness-man-removebg-preview.png" 
                alt="Workout Routine"
                className="animated-pic w-64 h-64 object-cover rounded-2xl shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            
            
          </div>
        
      ) : (
        <p>You don't have a routine assigned yet.</p>
      )}

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
              <select name="goal" value={updatedProfile.goal} onChange={handleChange}>
                <option value="">Select a goal</option>
                <option value="lean">Lean</option>
                <option value="toned">Toned</option>
                <option value="strength">Strength</option>
                <option value="bulk">Bulk</option>
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
    <button className="logout-btn" onClick={handleLogout}>
      🚪 Log Out
    </button>
    
    
    </div>
  );
}
