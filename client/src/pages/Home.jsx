import { useState, useEffect } from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAllExcercises,
         getWorkoutRoutine,
         getAllWorkoutRoutines,
         createNewWorkoutRoutine,
 } from '../utils/API';

const Home = () => {
    const [workoutRoutine, setWorkoutRoutine] = useState(null);
    const [allWorkoutRoutines, setAllWorkoutRoutines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(`Fetching items...`);
        currentWorkout();
      }, [])
    

    const currentWorkout = async () => {
        try {
          const response = await getWorkoutRoutine();
          const workout = await response.json();
          console.log(`Workout retrieved:`, workout);
          setAllItems(workout);
    
        } catch (err) {
          console.log(err);
        }
      }


    const allWorkouts = async () => {
        try {
            const response = await getAllWorkoutRoutines();
            const allWorkouts = await response.json();
            console.log(`All workouts retrieved:`, allWorkouts);
            setAllWorkoutRoutines(allWorkouts);

        } catch (err) {
          console.log(err);
        }
    }

    

return (
    <div className="homepage">
        <h1>Welcome to Your Workout</h1>

      <section className="current-workout">
      <h2>Your Current Workout</h2>
        {currentWorkout ? (
          <ul>
            {currentWorkout.exercises.map((ex, index) => (
              <li key={index}>{ex.name} – {ex.reps} reps</li>
            ))}
          </ul>
        ) : (
          <p>No workout yet. Generate one!</p>
        )}
        <button onClick={generateNewWorkout}>Generate New Workout</button>
      </section>

      </section>
        
    </div>
)

};

export default Home;