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

// const User = require('../models/User');
// const Workout = require('../models/WorkoutRoutine');
// const Exercise = require('..models/Exercise');
const { User, WorkoutRoutines, Exercise } = require("../models");
const fs = require('fs');
const path = require('path');

// const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'user_seeds.json'), 'utf-8'));
const workoutsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'workout_routines.json'), 'utf-8'));
const exercisesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'exercises.json'), 'utf-8'));
const seed = async () => {
  try {
    await cleanDB('users');
    await cleanDB('workouts');
    await cleanDB('exercises');

    // const users = await User.insertMany(usersData);
    // const userMap = {};
    // users.forEach(user => {
    //   userMap[user.email] = user._id;
    // });

    // const formattedWorkouts = workoutsData.map(w => ({
    //   user: userMap[w.userName],
    //   exercises: w.exercises,
    //   date: new Date(w.date),
    // }));

    const insertedExercises = await Exercise.insertMany(exercisesData);
    const exerciseMap = {};
    insertedExercises.forEach(ex => {
      exerciseMap[ex.name] = ex._id;
    });

    // Step 2: Insert routines (with exercise IDs)
    const routinesWithExerciseIds = workoutsData.map(routine => ({
      ...routine,
      exercises: routine.exercises.map(name => exerciseMap[name]),
    }));
    const insertedRoutines = await WorkoutRoutines.insertMany(routinesWithExerciseIds);


    const usersData = [
        {
            username: "John Doe",
            email: "john.doe@example.com",
            password: "hashed_password_123",
            age: 28,
            height: 180,
            weight: 75,
            goalBodyType: "Lean",
            fitnessLevel: "Intermediate",
            createdAt: new Date("2025-03-26T10:00:00.000Z"),
          },
          {
            username: "Jane Smith",
            email: "jane.smith@example.com",
            password: "hashed_password_456",
            age: 32,
            height: 165,
            weight: 60,
            goalBodyType: "Toned",
            fitnessLevel: "Beginner",
            createdAt: new Date("2025-03-26T11:00:00.000Z"),
          },
          {
            username: "Michael Johnson",
            email: "michael.johnson@example.com",
            password: "hashed_password_789",
            age: 40,
            height: 175,
            weight: 85,
            goalBodyType: "Muscular",
            fitnessLevel: "Advanced",
            createdAt: new Date("2025-03-26T12:00:00.000Z"),
          },
          {
            username: "Emily Davis",
            email: "emily.davis@example.com",
            password: "hashed_password_321",
            age: 24,
            height: 170,
            weight: 55,
            goalBodyType: "Toned",
            fitnessLevel: "Intermediate",
            createdAt: new Date("2025-03-26T13:00:00.000Z"),
          },
          {
            username: "David Martinez",
            email: "david.martinez@example.com",
            password: "hashed_password_654",
            age: 35,
            height: 182,
            weight: 90,
            goalBodyType: "Bulk",
            fitnessLevel: "Advanced",
            createdAt: new Date("2025-03-26T14:00:00.000Z"),
          },
          {
            username: "Sarah Wilson",
            email: "sarah.wilson@example.com",
            password: "hashed_password_987",
            age: 29,
            height: 160,
            weight: 58,
            goalBodyType: "Lean",
            fitnessLevel: "Beginner",
            createdAt: new Date("2025-03-26T15:00:00.000Z"),
          },
        ];
        
    
        // Map goalBodyType to routine _id
        const usersWithWorkoutRoutine = usersData.map(user => {
            const matchedRoutine = insertedRoutines.find(
                routine =>
                typeof routine.goal === 'string' &&
                routine.goal.toLowerCase() === user.goalBodyType.toLowerCase()
            );
          
            return {
              ...user,
              workoutRoutine: matchedRoutine ? matchedRoutine._id : null,
            };
          });
        
        
        // const usersWithRoutineRefs = usersData.map(user => {
        // //   const matchedRoutine = insertedRoutines.find(
        // //     routine => routine.goal.toLowerCase() === user.goalBodyType.toLowerCase()
        // //   );

        //   const matchedRoutine = await WorkoutRoutine.find(routine =>
        //     routine?.goal?.toLowerCase?.() === user.goalBodyType.toLowerCase()
        //   );
        
        //   return {
        //     ...user,
        //     routine: matchedRoutine ? matchedRoutine._id : null,
        //   };
        // });
        
        // Insert users
        await User.insertMany(usersWithWorkoutRoutine);
        console.log('👥 Users inserted and linked to routines');
//     await Workout.insertMany(formattedWorkouts);

//     console.log('🌱 Seeded from JSON successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding:', err);
    process.exit(1);
  }
};
    
db.once('open', seed);