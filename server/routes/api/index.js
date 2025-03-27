const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exercisemRoutes');
const workoutRoutineRoutes = require('./workoutRoutineRoutes');


router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/workout-routines', workoutRoutineRoutes);



module.exports = router;
