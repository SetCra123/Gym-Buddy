const router = require('express').Router();
const {
  savecompletedWorkoutRoutine,
  getcompletedWorkoutRoutine,
  createNewWorkoutRoutine,
  getAllworkoutRoutines,
  removeworkoutRoutine,
  getUserWorkout,
} = require('../../controllers/workoutRoutineController');



router.route('/').post(createNewWorkoutRoutine);
router.route('/').get(getAllworkoutRoutines);
router.route('/user/:userId').get(getUserWorkout)
                    .delete(removeworkoutRoutine);
//POST a saved workout
router.route('completed/save').post(savecompletedWorkoutRoutine);

//GET user completed workouts
router.route('completed/:userId').get(getcompletedWorkoutRoutine);



module.exports = router;
