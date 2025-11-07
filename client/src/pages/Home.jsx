import { useEffect, useState } from "react";
import { getUsers as getCurrentUser, updateUserProfile } from "../utils/API"
import { assignWorkoutRoutine } from "../../../server/controllers/userController";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  
    // ✅ Load from localStorage first, then refresh from backend

  useEffect(() => {
      // ✅ Load from localStorage first, then refresh from backend
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setLoading(false);
      }  
      //refresh user
      const fecthUser = async () => {  
       try {
        const refreshedUser = await getCurrentUser();
        setUser(refreshedUser);
        localStorage.setItem("user", JSON.stringify(refreshedUser));
       } catch (err) {
        console.error("❌ Failed to refresh user:", err);
       } finally {
         setLoading(false);
       }
      };

      fecthUser();

  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found</p>;

  const routine = user.workout_routine?.[0];

  // ✅ Open modal with user's current info
  const handleEditProfile = () => {
    setFormData({
      username: user.username || "",
      height: data.height?.[0] || "",
      weight: data.weight?.[0] || "",
      goal: data.goal?.[0] || "",
      fitness_level: data.fitness_level || "",
    });
  setShowModal(true);
  };
  
  // ✅ Update local state as user types
  const handleChange = async (e) => {
      const { name, value } = e.target; 
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    
  // ✅ Update profile
      
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateUserProfile(formData);
      console.log("✅ Updated user:", updated);

  // Detect goal or fitness change
      const goalChanged = formData.goal && formData.goal !== user.goal?.[0];
      const fitnessChanged = formData.fitness_level && formData.fitness_level !== user.fitness_level?.[0];

      let refreshedUser = updated;
 
    // Reassign routine if it changes
      if (goalChanged || fitnessChanged) {
        console.log("Goal or fitness level changed - reassigned routine...");
        const routineResponse = await assignWorkoutRoutine();
        console.log("🏋️ New routine assigned:", routineResponse);


        //refetch user data from back-end
        const freshUser = await getCurrentUser();
        refreshedUser = freshUser;
      }

      //Sync with UI and localstorage
      setUser(refreshedUser);
      localStorage.setItem("user", JSON.stringify(refreshedUser)); 
      
      setShowModal(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile")
    }
  };  
      
  

  return (
    <div className="home-page">
      <h1>Welcome, {user.username}!</h1>

      {routine ? (
        <div className="routine-container">
          <h2>Your Assigned Routine: {routine.name}</h2>
          <p>Goal: {routine.goal}</p>
          <p>Fitness Level: {routine.fitness_level}</p>

          <h3>Exercises:</h3>
          <ul>
            {routine.exercises && routine.exercises.length > 0 ? (
              routine.exercises.map((exercise) => (
                <li key={exercise._id}>
                  <strong>{exercise.name}</strong> – {exercise.muscle_group} ({exercise.difficulty})
                </li>
              ))
            ) : (
              <li>No exercises found</li>
            )}
          </ul>
        </div>
      ) : (
        <p>You don't have a routine assigned yet.</p>
      )}

      {/* ✅ Edit Profile Button */}
      <button
        onClick={handleEditProfile}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Edit Profile
      </button>

      {/* ✅ Modal Overlay */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "10px",
              padding: "30px",
              width: "400px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2>Edit Profile</h2>
            <form onSubmit={handleSaveProfile}>
              <label>Username:</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="modal-input"
              />

              <label>Height:</label>
              <input
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="modal-input"
              />

              <label>Weight:</label>
              <input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="modal-input"
              />

              <label>Goal:</label>
              <input
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                className="modal-input"
              />

              <label>Fitness Level:</label>
              <input
                name="fitness_level"
                value={formData.fitness_level}
                onChange={handleChange}
                className="modal-input"
              />

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}