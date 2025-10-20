const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const WorkoutRoutine  = require('../models/WorkoutRoutine');
const exerciseData = require('./exercises.json');
const workoutData = require('./workout_routines.json');

mongoose.connect('mongodb://127.0.0.1:27017/Gym-Buddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await Exercise.deleteMany({});
    await WorkoutRoutine.deleteMany({});

    const insertedExercises = await Exercise.insertMany(exerciseData);
    console.log('✅ Exercises seeded!');

    // Map routines to exercises by name
    const exerciseMap = {};
    insertedExercises.forEach(ex => exerciseMap[ex.name] = ex._id);

    const routinesWithIds = workoutData.map(routine => ({
      ...routine,
      exercises: routine.exercises.map(name => exerciseMap[name])
    }));

    await WorkoutRoutine.insertMany(routinesWithIds);
    console.log('✅ Workout routines seeded!');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
