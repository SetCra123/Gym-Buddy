const mongoose = require('mongoose');
const { Schema } = mongoose;


const workoutRoutineSchema = new Schema (
    {
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
     excercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Excercise'
     }],
     duration: {
        type: Number,
        required: true
     },
     intensity: {
        type: String, 
        enum: ['Low', 'Medium', 'High'],
        required: true
     },
    //  createdAt: {
    //     type: Date,
    //     default: Date.now
    //  }


    });

    const WorkoutRoutine = mongoose.model('WorkoutRoutine', workoutRoutineSchema);




module.exports = WorkoutRoutine;