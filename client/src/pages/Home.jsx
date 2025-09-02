import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, getUserWorkoutRoutine } from "../utils/API";
import ProfileCard from "../components/ProfileCard";
import WorkoutCard from "../components/WorkoutCard";

export default function Home() {
  const [user, setUser] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("id_token");
        const userData = await getUsers(token);
        setUser(userData);

        // If profile incomplete, redirect
        if (!userData.goal || !userData.fitnessLevel) {
          navigate("/profile-update");
          return;
        }

        // Fetch workout tailored to fitness level + goal
        const workoutData = await getUserWorkoutRoutine(userData.fitnessLevel, userData.goal);
        setWorkout(workoutData);

      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <h3>Loading your dashboard...</h3>;

  return (
    <div className="container mt-5">
      <h1>Welcome, <strong>{user?.username}</strong> 👋</h1>
      <ProfileCard user={user} />
      <WorkoutCard workout={workout} />
    </div>
  );
}
