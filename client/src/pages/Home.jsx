import { useEffect, useState } from "react";
import { getUserProfile } from "../utils/API";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const profile = await getUserProfile();
      setUser(profile);
    }
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="home">
      <h2>Welcome, {user.username}!</h2>
      <p>Goal: {user.goal}</p>
      <p>Fitness Level: {user.fitness_level}</p>
      <p>Height: {user.height}</p>
      <p>Weight: {user.weight} lbs</p>

      <h3>Your Workout Routine:</h3>
      {user.workout_routine?.exercises?.length ? (
        <ul>
          {user.workout_routine.exercises.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      ) : (
        <p>No routine assigned yet.</p>
      )}
    </div>
  );
}

export default Home;
