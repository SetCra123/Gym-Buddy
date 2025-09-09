const User = require('../models/User');
const WorkoutRoutine = require('../models/WorkoutRoutine');
const Exercise = require('../models/Exercise');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by either their id or their username
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.json(foundUser);
    },
    
    async getUsers(req, res) {
        const foundUsers = await User.find();

        if (!foundUsers) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.json(foundUsers);
    },
    
    
    
    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    async createUser({ body }, res) {
        console.log(body)
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        console.log(user, token);
        res.json({ token, user });
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }


        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },



    //remove user
    async removeUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'User created but no user with this id!' });
            }

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async updateUserProfile(req, res) {
        try {
          const userId = req.user._id;
          const { age, height, weight, goal, fitness_type } = req.body;
          console.log(req.body);
  
          const updatedUser = await findByIDAndUpdate(
            userId,
            {
              age,
              height,
              weight,
              fitness_type,
              goal,
            }, {
                new: true
            });
  
            if (!updatedUser) {
                return res.status(404).json({message: "User not found"});
            }
  
            if(!updatedUser.workoutRoutine) {
                const userExercises = await Exercise.find({
                    difficulty: fitness_type,
                    goal: goal
                }).limit(5);
                console.log(userExercises);
            
                if (!userExercises || userExercises.length === 0) {
                    console.warn("No exercises found for", { goal, fitness_type });
                    return res.status(400).json({ message: "No matching exercises found." });
                  }

            const newWorkout = await WorkoutRoutine.create({
                userId,
                goal,
                difficulty,
                duration: duration, 
                intensity: intensity,
                exercises: userExercises.map(ex => ex._id),
            });
    
           
         updatedUser.workoutRoutine.push(newWorkout._id);  
         await updatedUser.save(); 
        } 
       
        res.json(updatedUser);

        }

        catch (err) {
          console.error(err);
          res.status(400).json({ message: 'Failed to update profile' });
        }
      },
};