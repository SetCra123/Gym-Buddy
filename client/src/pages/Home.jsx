import { useState, useEffect } from 'react';
import CurrntWkOut from '../components/CurrntWkOut';

const Home = () => {
  
  const [error, setError] = useState(null);

  const handleCreateWorkout = async () => {
    try {
      const newWorkout = await createNewWorkoutRoutine({ name: "Custom Plan" });
      console.log("Created new workout:", newWorkout);
      // optional: refresh workouts after creation
    } catch (err) {
      setError(err.message);
    }
  };
  
  
  
  
  
  return (
    <div className="homepage bg-light vh-100 p-4">
      <h1 className="text-center mb-4">Welcome to Your Workout</h1>

      <section className="current-workout">
        <CurrntWkOut />
        <button onClick={handleCreateWorkout}>Generate New Workout</button>
      </section>
    </div>
  );
};

export default Home;