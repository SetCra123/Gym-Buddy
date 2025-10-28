
// import User from './models/User.js'; // adjust path as needed
// const mongoose = require('mongoose');

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/Gym-Buddy'; // or your Atlas URI

// async function fixEnums() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('Connected to DB ✅');

//     await User.updateMany(
//       { fitness_level: 'beginner' },
//       { $set: { fitness_level: ['Beginner'] } }
//     );

//     await User.updateMany(
//       { goal: 'lean' },
//       { $set: { goal: ['Lean'] } }
//     );

//     console.log('✅ Enum values updated successfully!');
//   } catch (err) {
//     console.error('Error fixing enums:', err);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// fixEnums();
