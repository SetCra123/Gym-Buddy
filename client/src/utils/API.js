import apiRequest from "./apiRequest";

// ===========================
// 🧠 USER ROUTES
// ===========================

// ✅ Get the logged-in user's info
export const getUsers = async () => {
  const token = localStorage.getItem("token");
  return apiRequest(
    "/api/users/me",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    "Failed to fetch user"
  );
};

// ✅ Create a new user
export const createUser = async (userData) => {
  return apiRequest(
    "/api/users/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
    "Signup failed, please try again"
  );
};

// Login existing user
export const login = async (userData) => {
  const { token } = await apiRequest("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  },
  "Login failed");

  const user = await apiRequest(
    "/api/users/me",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}`},
    },
    "Failed to fetch user profile"
  );
  
  return { token, user };
};

// ✅ Update user's profile (age, height, weight, etc.)
export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  console.log("📤 Sending profile update with data:", profileData);

  const result = await apiRequest(
    "/api/users/me",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    },
    "Failed to update profile"
  );

  console.log("📦 updateUserProfile result:", result);
  return result;
};

// ✅ Assign workout routine
export const assignWorkoutRoutine = async () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return apiRequest(
    "/api/users/assign-routine",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(),
    },
    "Failed to assign workout routine"
  );
};

// ✅ Update user's goal (e.g. "Build Muscle", "Lose Fat")
export async function updateUserGoal(goal) {
  const token = localStorage.getItem("token");

  return apiRequest(
    "/api/users/update-goal",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ goal }),
    },
    `Failed to update user goal: ${goal}`
  );
}

// ✅ Update user's fitness level (e.g. "Beginner", "Advanced")
export async function updateUserFitnessLevel(fitness_level) {
  const token = localStorage.getItem("token");

  return apiRequest(
    "/api/users/update-fitness",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fitness_level }),
    },
    `Failed to update fitness level`
  );
}

// ✅ Get full user profile (for home or dashboard)
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  return apiRequest(
    "/api/users/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    "Failed to fetch user profile"
  );
};

// ===========================
// 💪 WORKOUT ROUTES
// ===========================

// ✅ Get a specific user's workout routine
export const getUserWorkoutRoutine = async (userId) => {
  const res = await fetch(`/api/workout-routines/user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Failed to fetch workout routine");
  return res.json();
};

// ✅ Create a new workout routine (admin or seed feature)
export const createNewWorkoutRoutine = async (userData) => {
  return apiRequest(
    "/api/workout-routines/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
    "Failed to create new workout"
  );
};

export const saveCompletedWorkoutRoutine = async (workoutData) => {
  return apiRequest(
    '/api/workout-routines/completed/save',
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workoutData)
  });
};

export const getCompletedWorkoutRoutine = async (userId) => {
  return apiRequest(
    `/api/workout-routines/completed/${userId}`,
    {
    method: "GET",
    headers: { 
      "Content-Type": "application/json"
    },
  });
};

export const logout = () => {
  // 🧹 Clear all auth data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // 🚪 Redirect to login page
  window.location.href = "/login";
};