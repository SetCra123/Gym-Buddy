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
      difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
      },
      equipment: { 
        type: Boolean, 
        default: false 
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