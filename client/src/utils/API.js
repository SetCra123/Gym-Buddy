

//USER ROUTES

// route to get logged in user's info (needs the token)

export const getUsers = (token) => {
    return fetch('/api/users/me', {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    });
};


export const createUser =  async (userData) => {
    try {
        const response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
        if (!response.ok){
            throw new Error("Signup failed, please try again.");
        }
        return data
    } catch(err){
        console.log(err);
        
    }
};

export const login = (userData) => {
    return fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
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

export const getWorkoutRoutine = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const data = await fetch(`/api/workout-routines/:Id${user._id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        
    });
    return data;
};

// export const getAllWorkoutRoutines = (userData) => {
//     return fetch('/api/workout-routines/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//     });
// };

export const createNewWorkoutRoutine = (userData) => {
    return fetch('/api/workout-routines/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};