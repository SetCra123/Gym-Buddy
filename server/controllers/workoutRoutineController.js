const WorkoutRoutine = require('../models/WorkoutRoutine');
const User = require('../models/User');
const Exercise = require('../models/Exercise');
const CompletedWorkout = require('../models/CompletedWorkout');



module.exports = {
    
    async saveCompletedWorkoutRoutine(req, res){
      try {
        const workout = await CompletedWorkout.create({
          userId: req.body.userId,
          goal: req.body.goal,
          fitness_level: req.body.fitness_level,
          exercises: req.body.exercises,
          duration: req.body.duration, 
          dateCompleted: new Date()
        });
        res.json(workout);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    
    async getCompletedWorkoutRoutine(req, res){
      try {
        const workouts = await CompletedWorkout.find({
          userId: req.params.userId
        }).sort({ dateCompleted: -1 });

        res.json(workouts);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    async createNewWorkoutRoutine(req, res,) {
      try {
        const { userId, exercises, duration, intensity, difficulty, goal } = req.body;
        console.log(req.body);

        const newWorkoutRoutine = await WorkoutRoutine.create({
            userId,
            exercises,
            duration,
            intensity,
            difficulty,
            goal,


        });

        await newWorkoutRoutine.save();

        await User.findByIdAndUpdate(userId, { $push: { workoutRoutine: newWorkoutRoutine._id } });
  
        res.status(201).json(newWorkoutRoutine);
      } catch (err) {
        res.status(400).json({message: 'Server error'});
      }
    },
  
    async getAllworkoutRoutines(req, res,) {
      try {
        const workoutRoutine = await WorkoutRoutine.find().populate('user').populate('exercises');
        console.log(workoutRoutine);
  
        res.json(workoutRoutine);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    async getUserWorkoutRoutine(req, res) {
      try {
        const workoutRoutine = await WorkoutRoutine.findOne({ _id: req.params.workoutRoutineId })
          .select('-__v');
  
        if (!workoutRoutine) {
          return res.status(404).json({ message: 'No routine with that ID' });
        }
  
        res.json(workoutRoutine);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async getUserWorkout(req, res) {
      try {
        const { userId } = req.params;
        const user = await User.findById(userId);
    
        if (!user) return res.status(404).json({ error: "User not found" });
        if (!user.goal || !user.fitness_level)
          return res.status(400).json({ error: "User must have a goal and fitness_type" });
    
        // Map goals to muscle groups
        let muscleGroups = [];
        switch (user.goal.toLowerCase()) {
          case 'lean':
            muscleGroups = ['Core', 'Legs', 'Chest'];
            break;
          case 'bulk':
            muscleGroups = ['Back', 'Chest', 'Arms'];
            break;
          case 'strength':
            muscleGroups = ['Legs', 'Back', 'Shoulders'];
            break;
          default:
            muscleGroups = ['Full Body'];
        }
    
        // Find exercises that match the goal and fitness type
        const exercises = await Exercise.find({
          muscleGroup: { $in: muscleGroups },
          fitness_type: fitness_level.charAt(0).toUpperCase() + fitness_level.slice(1),
          goal: goal?.toLowerCase()
          }).limit(5);
    
        if (exercises.length === 0)
          return res.status(404).json({
            message: `No exercises found for ${user.goal} - ${user.fitness_level}`,
          });
    
        // Create the routine
        const newRoutine = await WorkoutRoutine.create({
          userId: user._id,
          goal: user.goal,
          fitness_type: user.fitness_level,
          exercises: exercises.map((ex) => ex._id),
          duration: '4 weeks',
        });
    
        res.status(201).json({
          message: 'Workout routine created successfully',
          routine: newRoutine,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    
  
    //remove item
    async removeworkoutRoutine(req, res) {
      try {
        const workoutRoutine = await WorkoutRoutine.findOneAndRemove({ _id: req.params.workoutRoutineId });
  
        if (!workoutRoutine) {
          return res.status(404).json({ message: 'No item with this id!' });
        }
  
        if (!workoutRoutine) {
          return res
            .status(404)
            .json({ message: 'Item created but no user with this id!' });
        }
  
        res.json({ message: 'Item successfully deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    
  };