// const db = require("../config/connection");
// const { User, WorkoutRoutines } = require("../models");
// const userSeeds = require("./user_seeds.json");
// const workoutRoutineSeeds = require("./workout_routines.json");
// const cleanDB = require("./cleanDB");


// db.once("open", async () => {
//     try {
//         await cleanDB("User", "user");
//         await cleanDB("Workout_Routine", "workout_routines");


//         const createdWorkoutRoutine = await WorkoutRoutines.create(workoutRoutineSeeds);

//         const workoutRoutineIds = createdWorkoutRoutine.map(WorkoutRoutines =>WorkoutRoutines._id);

//         const usersWithWorkoutRoutines = userSeeds.map(user => {
//             const randomWorkoutRoutineCount = Math.floor(Math.random() * 5) + 1;
//             const randomWorkoutRoutine = [];

//             for (let i = 0; i < randomWorkoutRoutineCount; i++) {
//                 const randomIndex = Math.floor(Math.random() * workoutRoutineIds.length);
//                 randomWorkoutRoutine.push(workoutRoutineIds[randomIndex]);
//             }

//             return {
//                 ...user,
//                 workoutRoutine: randomWorkoutRoutine,

//             };
//         });

//         await User.create(usersWithWorkoutRoutines);
         
//     } catch (err) {
//       console.error(err);
//       process.exit(1);
//     }

//     console.log("Finito!");
//     process.exit(0);
// });

const mongoose = require('mongoose');
const db = require('../config/connection');
const cleanDB = require('./cleanDB');

const User = require('../models/User');
const Workout = require('../models/WorkoutRoutine');
const fs = require('fs');
const path = require('path');

const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'user_seeds.json'), 'utf-8'));
const workoutsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'workout_routines.json'), 'utf-8'));

const seed = async () => {
  try {
    await cleanDB('users');
    await cleanDB('workouts');

    const users = await User.insertMany(usersData);
    const userMap = {};
    users.forEach(user => {
      userMap[user.email] = user._id;
    });

    const formattedWorkouts = workoutsData.map(w => ({
      user: userMap[w.userName],
      exercises: w.exercises,
      date: new Date(w.date),
    }));

    await Workout.insertMany(formattedWorkouts);

    console.log('🌱 Seeded from JSON successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding:', err);
    process.exit(1);
  }
};

db.once('open', seed);