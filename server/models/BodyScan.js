const mongoose = require('mongoose');
const { Schema } = mongoose;


const bodyScanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    imageUrl: String,
    analysis: {
        bodyFat: Number,
        muscleDistribution: Object,
        posture: String,
        bodyType: String,
    },
    workoutPlan: Object,
    nutritionPan: Object,
    createAt: {
        type: Date,
        default: Date.now,
    },
});



const bodyScan = mongoose.model('bodyScan', bodyScanSchema);



module.exports = bodyScan;