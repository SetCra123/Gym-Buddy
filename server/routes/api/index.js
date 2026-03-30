const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const workoutRoutineRoutes = require('./workoutRoutineRoutes');
const bodyScanRoutes = require('./bodyScanRoutes');


router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/workout-routines', workoutRoutineRoutes);
router.use('/bodyScan', bodyScanRoutes)



module.exports = router;
