const mongoose = require('mongoose');
const { Schema } = mongoose;

const workoutRoutineSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    goal: {
      type: String,
      enum: ['lean', 'bulk', 'strength', 'toned'],
      required: true,
    },
    fitness_level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    exercises: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    duration: {
      type: String,
      default: '4 weeks',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Example virtual to show how many exercises are in the routine
workoutRoutineSchema.virtual('exerciseCount').get(function () {
  return this.exercises.length;
});

const WorkoutRoutine = mongoose.model('WorkoutRoutine', workoutRoutineSchema);

module.exports = WorkoutRoutine;
