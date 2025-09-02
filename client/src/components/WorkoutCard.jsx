export default function WorkoutCard({ workout }) {
    if (!workout) {
      return <p>No workout found. Update your profile to generate one!</p>;
    }
  
    return (
      <div className="card p-3 shadow-sm mt-3">
        <h3>Your Workout</h3>
        <ul>
          {workout.exercises.map((exercise, i) => (
            <li key={i}>
              {exercise.name} — {exercise.sets}×{exercise.reps}
            </li>
          ))}
        </ul>
      </div>
    );
  }