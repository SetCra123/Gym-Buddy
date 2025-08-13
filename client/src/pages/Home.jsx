import { useState, useEffect } from 'react';
// import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { 
         getWorkoutRoutine,
         createNewWorkoutRoutine,
         
 } from '../utils/API';
 import CurrntWkOut from '../components/CurrntWkOut';

const Home = () => {
    // const [allWorkoutRoutines, setAllWorkoutRoutines] = useState([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     console.log(`Fetching items...`);
    //     currentWorkout();
    //   }, [])
    

    // const currentWorkout = async () => {
    //     try {
    //       const response = await getWorkoutRoutine();
    //       const workout = await response.json();
    //       console.log(`Workout retrieved:`, workout);
    //       setAllItems(workout);
    
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }


    // const allWorkouts = async () => {
    //     try {
    //         const response = await getAllWorkoutRoutines();
    //         const allWorkouts = await response.json();
    //         console.log(`All workouts retrieved:`, allWorkouts);
    //         setAllWorkoutRoutines(allWorkouts);

    //     } catch (err) {
    //       console.log(err);
    //     }
    // }

    

return (
    <div className="homepage">
        <h1>Welcome to Your Workout</h1>

      <section className="current-workout">
      <h2>Your Current Workout</h2>
        <CurrntWkOut />
        <button onClick={generateNewWorkout}>Generate New Workout</button>
      </section>

      
        
    </div>
)

};

export default Home;