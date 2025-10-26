import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/API";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="home">
      <h2>Welcome back, {user.username}!</h2>
      {user.workoutRoutine ? (
        <>
          <h3>Your Current Routine</h3>
          <p>Goal: {user.goal}</p>
          <p>Fitness Level: {user.fitness_level}</p>
          <p>Duration: {user.workoutRoutine.duration}</p>
          <p>Notes: {user.workoutRoutine.notes}</p>
        </>
      ) : (
        <p>You haven’t selected a routine yet.</p>
      )}
    </div>
  );
}
