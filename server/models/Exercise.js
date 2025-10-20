const mongoose = require('mongoose');
const { Schema } = mongoose;


const exerciseSchema = new Schema (
    {
      name: {
        type: String,
        required: true,
      },
      muscleGroup: {
        type: String,
        required: true,
      },
      fitness_level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
      },
      equipment: { 
        type: String, 
        enum: ['Bodyweight', 'Barbell', 'Dumbbells', 'Pull-up Bar', 'Parallel Bars'], 
      },
      goal: [{
        type: String,
        ref: "Goal",
        required: true,
        enum: ['Lean', 'Strength', 'Bulk', 'Toned']
      }],
      description: { 
        type: String,
      },
      reps: { 
        type: String
      },
      sets: {
        type: String
      },
      duration: {
        type: String
      },
      caloriesBurned: {
        type: String
      },
      videoUrl: { 
        type: String 
     } // Optional for exercise demonstrations
 }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);




module.exports = Exercise;