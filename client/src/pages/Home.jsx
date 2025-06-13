import { useState, useEffect } from 'react';
import './home.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAllExcercises,
         getWorkoutRoutine,
         getAllWorkoutRoutines,
         createNewWorkoutRoutine,
 } from '../utils/API';

const Home = () => {
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [workoutHistory, setWorkoutHistory] = useState([]);
    const [loading, setLoading] = useState(true);


return (
    <div className="homepage">
        <h1>Welcome to Your Workout</h1>

      <section className="current-workout">
        

      </section>
        
    </div>
)

};

export default Home;