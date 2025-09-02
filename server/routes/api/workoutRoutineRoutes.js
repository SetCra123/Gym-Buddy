const router = require('express').Router();
const {
  createNewWorkoutRoutine,
  getAllworkoutRoutines,
  removeworkoutRoutine,
  getUserWorkout,
} = require('../../controllers/workoutRoutineController');



router.route('/').post(createNewWorkoutRoutine);
router.route('/').get(getAllworkoutRoutines);
router.route('/user/:userId').get(getUserWorkout)
                    .delete(removeworkoutRoutine);



module.exports = router;
