import React from 'react';
import { getWorkoutRoutine } from '../utils/API';
import { Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';



function CurrntWkOut () {

    const [workoutRoutine, setworkoutRoutine] = useState(null);
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
            setworkoutRoutine(workout);

        }
        catch (err) {
            console.log(err)
        }
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-50'>
                <h2>Your Current Workout</h2>
                <div>
                    {workoutRoutine}
                </div>
            </div>
        </div>
    ) 
}; 


export default CurrntWkOut; 