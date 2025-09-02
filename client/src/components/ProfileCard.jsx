export default function ProfileCard({ user }) {
    if (!user) return <p>No profile info available.</p>;
  
    return (
      <div className="card p-3 shadow-sm">
        <h3>Your Profile</h3>
        <ul>
          <li><strong>Username:</strong> {user.username}</li>
          <li><strong>Email:</strong> {user.email}</li>
          <li><strong>Age:</strong> {user.age}</li>
          <li><strong>Height:</strong> {user.height}</li>
          <li><strong>Weight:</strong> {user.weight}</li>
          <li><strong>Fitness Level:</strong> {user.fitness_level}</li>
          <li><strong>Goal:</strong> {user.goal}</li>
        </ul>
      </div>
    );
  }