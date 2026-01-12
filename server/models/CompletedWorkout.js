const mongoose = require('mongoose');
const { Schema } = mongoose;


const completedWorkoutSchema = new Schema (
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      exercises: [
        {
          name: String,
          reps: String,
          sets: Number,
          duration: String
        }
      ],
      fitness_level: {
        type: String,
        required: true,
      },
      goal: {
        type: String,
        required: true,
      },
      dateCompleted: {
        type: Date,
        default: Date.now
      },
 }
);

const completedWorkout = mongoose.model('completedWorkout', completedWorkoutSchema);




module.exports = completedWorkout;