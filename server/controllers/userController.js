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
  console.log("🟢 Incoming profile update request...");
  console.log("🔑 Authenticated user:", req.user);
  console.log("📦 Request body:", req.body);

  try {
    const userId = req.user._id;
    const { age, height, weight, goal, fitness_level } = req.body;
  
    // update user profile info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { age, height, weight, fitness_level, goal },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

// Find matching exercises   
    const exercise = await Exercise.find({
      goal: goal,
      fitness_level: fitness_level
    });
    if (exercise.length === 0) {
      return res.status(404).json({
        message: `No exercises found for goal: ${goal} and fitness level: ${fitness_level}`
      });
    }

    // Create new workout routine
    const workoutRoutine = await WorkoutRoutine.create({
      userId: req.user._id,
      goal,
      fitness_level,
      exercises: exercise.map(ex => ex._id),
      duration: '4 weeks',
      notes: `Auto-generated ${goal} routine for ${fitness_level} user`
    });
 
    //Assign workout to user
    updatedUser.workoutRoutine = workoutRoutine._id;
    await updatedUser.save();

    res.status(201).json({
      message: '✅ Profile completed and workout routine generated!',
      user,
      workoutRoutine
    });

  } catch (err) {
    console.error("❌ Error updating user profile:", err);
    res.status(400).json({ message: "Failed to update profile" });
  }
}
};