import React, { useState, useEffect } from 'react';
import { getWorkoutRoutine } from '../utils/API';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

function CurrntWkOut() {
  const [workoutRoutine, setWorkoutRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWorkout();
  }, []);

  const fetchWorkout = async () => {
    try {
      const workout = await getWorkoutRoutine(); // ✅ returns JSON
      setWorkoutRoutine(workout);
    } catch (err) {
      console.error('Error fetching workout:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        Error: {error}
      </Alert>
    );
  }

  return (
    <div className="bg-white p-3 rounded w-100">
      <h2 className="mb-4 text-center">{workoutRoutine?.name || 'Workout Routine'}</h2>

      {workoutRoutine?.exercises && workoutRoutine.exercises.length > 0 ? (
        workoutRoutine.exercises.map((exercise) => (
          <Card key={exercise.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{exercise.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {exercise.muscleGroup} • Difficulty: {exercise.difficulty}
              </Card.Subtitle>
              <Card.Text>
                Calories Burned: <strong>{exercise.caloriesBurned}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No exercises found in this routine.</p>
      )}

      <div className="text-center mt-3">
        <Button variant="primary" onClick={fetchWorkout}>
          Refresh Workout
        </Button>
      </div>
    </div>
  );
}

export default CurrntWkOut;
