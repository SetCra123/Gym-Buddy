const db = require("../config/connection");
const { User, WorkoutRoutines } = require("../models");
const userSeeds = require("./user_seeds.json");
const workoutRoutineSeeds = require("./workout_routines.json");

db.once("open", async () => {
    try {
        await cleanDB("User", "user");
        await cleanDB("Workout_Routine", "workout_routines");


        const createdWorkoutRoutine = await WorkoutRoutines.create(workoutRoutineSeeds);

        const workoutRoutineIds = createdWorkoutRoutine.map(WorkoutRoutines =>WorkoutRoutines._id);

        const usersWithWorkoutRoutines = userSeeds.map(user => {
            const randomWorkoutRoutineCount = Math.floor(Math.random() * 5) + 1;
            const randomWorkoutRoutine = [];

            for (let i = 0; i < randomWorkoutRoutineCount; i++) {
                const randomIndex = Math.floor(Math.random() * workoutRoutineIds.length);
                randomWorkoutRoutine.push(workoutRoutineIds[randomIndex]);
            }

            return {
                ...user,
                workoutRoutine: randomWorkoutRoutine,

            };
        });

        await User.create(usersWithWorkoutRoutines);
         
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("Finito!");
    process.exit(0);
});