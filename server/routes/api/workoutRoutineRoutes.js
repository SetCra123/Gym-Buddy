const router = require('express').Router();
const {
  createNewWorkoutRoutine,
  getworkoutRoutine,
  getAllworkoutRoutines,
  removeworkoutRoutine,
  getUserWorkout,
} = require('../../controllers/workoutRoutineController');



router.route('/').post(createNewWorkoutRoutine);
router.route('/').get(getAllworkoutRoutines);
router.route('/user/:userId').get(getworkoutRoutine, getUserWorkout)
                    .delete(removeworkoutRoutine);



module.exports = router;
