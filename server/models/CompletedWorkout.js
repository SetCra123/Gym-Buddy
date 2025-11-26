const mongoose = require('mongoose');
const { Schema } = mongoose;


const completedWorkoutSchema = new Schema (
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      routineName: {
        type: String,
        required: true
      },
      exercises: [
        {
          name: String,
          reps: Number,
          sets: Number,
          duration: String
        }
      ],
      caloriesBurned: Number,
      dateCompleted: {
        type: Date,
        defaut: Date.now
      },
 }
);

const completedWorkout = mongoose.model('completedWorkout', completedWorkoutSchema);




module.exports = completedWorkout;