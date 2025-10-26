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
    const { age, height, weight, goal } = req.body;
  
    // update user profile info
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { age, height, weight, goal, profileComplete: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

// Find matching exercises   
    const routines = await WorkoutRoutine.find({
      goal: goal
    });

    if (routines.length === 0) {
      return res.status(404).json({
        message: `No workout routines found for goal: ${goal}`,
      });
    }

    console.log(`💪 Found ${routines.length} routines for goal: ${goal}`);

    res.status(200).json({
      message: "✅ Profile updated. Choose your fitness level routine.",
      user: updatedUser,
      availableRoutines: routines
    });

    

  } catch (err) {
    console.error("❌ Error updating user profile:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
},


async assignWorkoutRoutine(req, res) {
  try {
    const userId = req.user._id;
    const { routineId } = req.body;

    const routine = await WorkoutRoutine.findById(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Workout routine not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { workoutRoutine: routineId },
      { new: true }
    ).populate("workoutRoutine");

    res.status(200).json({
      message: "✅ Workout routine assigned successfully!",
      user: updatedUser
    });
  } catch (err) {
    console.error("❌ Error assigning routine:", err);
    res.status(400).json({ message: "Failed to assign routine" });
  }
},

async getWorkoutRoutinesByGoal(req, res) {
  try {
    const { goal } = req.params;

    console.log("🎯 Fetching workout routines for goal:", goal);

    // Find all routines that match the goal
    const routines = await WorkoutRoutine.find({ goal });

    if (!routines.length) {
      return res.status(404).json({ message: `No workout routines found for goal: ${goal}` });
    }

    res.json(routines);
  } catch (err) {
    console.error("❌ Error fetching workout routines by goal:", err);
    res.status(500).json({ message: "Server error fetching workout routines", error: err.message });
  }
},

};