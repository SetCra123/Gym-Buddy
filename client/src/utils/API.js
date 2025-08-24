

//USER ROUTES

// route to get logged in user's info (needs the token)

export const getUsers = async (token) => {
    const res = await fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
};


export const createUser =  async (userData) => {
       const res = await fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
        if (!res.ok){
            throw new Error("Signup failed, please try again.");
        }
        return res.json();
    

};




export const login = async (userData) => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  };
  
  // WORKOUT ROUTES
  export const getWorkoutRoutine = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?._id) throw new Error('No user ID found in localStorage');
  
    const res = await fetch(`/api/workout-routines/${user._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!res.ok) throw new Error('Failed to fetch workout routine');
    return res.json(); // ✅ always parsed JSON
  };
  
  export const createNewWorkoutRoutine = async (userData) => {
    const res = await fetch('/api/workout-routines/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Failed to create new workout');
    return res.json();
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

