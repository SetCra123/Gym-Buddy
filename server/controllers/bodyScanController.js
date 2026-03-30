const BodyScan = require('../models/BodyScan');
const { analyzeBody } = require('../services/bodyAnalysisService');
const { generateWorkoutPlan, generateNutritionPlan } = require('../services/planService');


module.exports = {
    async createBodyScan(req, res) {
        try {
           const imagePath = req.file.path;
           
           const analysis = await analyzeBody(imagePath);
           const workoutPlan = generateWorkoutPlan(analysis);
           const nutritionPlan = generateNutritionPlan(analysis); 

           const scan = await BodyScan.create({
             userId: req.user?._id,
             imageUrl: imagePath,
             analysis,
             workoutPlan,
             nutritionPlan,
           });

           res.json(scan);
        }  catch (err) {
           res.status(500).json({ error: err.message }) 
        }
    }
};