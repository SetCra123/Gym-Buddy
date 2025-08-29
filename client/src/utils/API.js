import apiRequest from "./apiRequest"

//USER ROUTES

// route to get logged in user's info (needs the token)

export const getUsers = async (token) => {
    return apiRequest('/api/users/me', {
      method: 'GET',  
      headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
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
  export const getWorkoutRoutine = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) throw new Error('No user ID found in localStorage');
  
    return apiRequest(`/api/workout-routines/${user._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }, "Failed to fetch workout routine");
  };
  
  export const createNewWorkoutRoutine = async (userData) => {
    return apiRequest('/api/workout-routines/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }, "Failed to create new workout");
  };


  export const updateUserProfile = async () => {
    return apiRequest('/api/users/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
    }, "Failed to create new workout");
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

