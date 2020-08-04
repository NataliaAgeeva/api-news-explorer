const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Invalid Email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (value) => !validator.isEmpty(value, { ignore_whitespace: true }),
      message: 'Invalid name',
    },
  },
});

// userSchema.plugin(uniqueValidator);

// userSchema.statics.findUserByCredentials = function checkUser(email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new AuthorizationError('Incorrect mail or password'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new AuthorizationError('Incorrect mail or password'));
//           }
//           return user;
//         });
//     });
// };

module.exports = mongoose.model('user', userSchema);
