

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


export const createUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
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

export const getAllExcercises = (userData) => {
    return fetch('/api/exercises/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const getWorkoutRoutine = (userData) => {
    return fetch('/api/workout-routines/:Id', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const getAllWorkoutRoutines = (userData) => {
    return fetch('/api/workout-routines/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const createNewWorkoutRoutine = (userData) => {
    return fetch('/api/workout-routines/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};