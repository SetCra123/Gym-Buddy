const mongoose = require('mongoose');
const { Schema } = mongoose;


const exerciseSchema = new Schema (
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

const Exercise = mongoose.model('Exercise', exerciseSchema);




module.exports = Exercise;