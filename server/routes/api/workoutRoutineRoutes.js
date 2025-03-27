const router = require('express').Router();
const {
  createNewWorkoutRoutine,
  getWorkoutRoutine,
  getAllWorkoutRoutines,
  removeWorkoutRoutine,
} = require('../../controllers/workoutRoutineController');



router.route('/').post(createNewWorkoutRoutine);
router.route('/').get(getAllWorkoutRoutines);
router.route('/:Id').get(getWorkoutRoutine);
router.route('/:Id').delete(removeWorkoutRoutine);



module.exports = router;
