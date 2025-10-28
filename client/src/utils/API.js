import apiRequest from "./apiRequest"

//USER ROUTES

// route to get logged in user's info (needs the token)

export const getUsers = async (token) => {
    return apiRequest('/api/users/me', {
      method: 'GET',  
      headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
      },
        "Failed to fetch user");
        
    };
    
    



export const createUser =  async (userData) => {
       
      return apiRequest('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }, "Signup failed, please try again");
};




export const login = async (userData) => {
    return apiRequest('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }, "Login failed");
  };
  
  // WORKOUT ROUTES


  export const getUserWorkoutRoutine = async (userId) => {
    const res = await fetch(`/api/workout-routines/user/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    if (!res.ok) throw new Error("Failed to fetch workout routine");
    return res.json();
  };
  
  export const createNewWorkoutRoutine = async (userData) => {
    return apiRequest('/api/workout-routines/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }, "Failed to create new workout");
  };


  export const updateUserProfile = async (profileData) => {
    const token = localStorage.getItem("id_token");
  
    return apiRequest("/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    }, "Failed to update profile");
  };

  export const assignWorkoutRoutine = async (routineId) => {
    const token = localStorage.getItem("id_token");
  
    return apiRequest("/api/users/assign-routine", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ routineId }),
    }, "Failed to assign workout routine");
  };


  export async function updateUserGoal(goal) {
    return apiRequest(`/api/users/update-goal`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }, `Failed to fetch workout routines for goal: ${goal}`);
  }

  export async function updateUserFitnessLevel(fitness_level) {
    return apiRequest(`/api/users/update-fitness`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    }, `Failed to fetch workout routines for goal: ${goal}`);
  }


  // ✅ Get user profile (for home page)
export const getUserProfile = async () => {
  const token = localStorage.getItem("id_token");
  return apiRequest("/api/users/me", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }, "Failed to fetch user profile");
};
  //EXERCISE ROUTES

// export const getAllExcercises = (userData) => {
//     return fetch('/api/exercises/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });
// };



// // export const getAllWorkoutRoutines = (userData) => {
// //     return fetch('/api/workout-routines/', {
// //         method: 'GET',
// //         headers: {
// //             'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(userData),
// //     });
// // };

