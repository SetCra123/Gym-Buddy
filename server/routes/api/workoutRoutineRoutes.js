const router = require('express').Router();
const {
  createNewWorkoutRoutine,
  getworkoutRoutine,
  getAllworkoutRoutines,
  removeworkoutRoutine,
} = require('../../controllers/workoutRoutineController');



router.route('/').post(createNewWorkoutRoutine);
router.route('/').get(getAllworkoutRoutines);
router.route('/:Id').get(getworkoutRoutine);
router.route('/:Id').delete(removeworkoutRoutine);



module.exports = router;
