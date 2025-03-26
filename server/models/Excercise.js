const mongoose = require('mongoose');
const { Schema } = mongoose;


const excerciseSchema = new Schema (
    {
      name: {
        type: String,
        required: true,
      },
      muscle_group: {
        type: String,
        required: true,
      },
      difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
      },
      equipmentRequired: { 
        type: Boolean, 
        default: false 
      },
      description: { 
        type: String 
      },
      videoUrl: { 
        type: String 
     } // Optional for exercise demonstrations
 }
);

const Excercise = mongoose.model('Excercise', excerciseSchema);




module.exports = User;