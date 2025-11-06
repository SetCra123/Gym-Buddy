import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load the fully populated user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  const routine = user.workout_routine?.[0]; // since workout_routine is an array

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
                  <strong>{exercise.name}</strong> - {exercise.muscleGroup} ({exercise.description})
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
    </div>
  );
}
