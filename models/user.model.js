const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')

const SALT_ROUNDS = 6

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    max: 50
  },
  displayName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'user'
  }
}, { timestamps: true })

// Adds validation for unique constraints
userSchema.plugin(uniqueValidator)

// Validates the email is a valid format
userSchema
  .path('email')
  .validate(validator.isEmail, 'Email `{VALUE}` is not a valid format', 'Invalid email format')

// Hashes the password before saving to the MongoDB database
userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err)

    this.password = hash

    next()
  })
})

// Compares the password with the user's hashed password during login
userSchema.methods.comparePassword = function(tryPassword, cb) {
  return bcrypt.compare(tryPassword, this.password, cb)
}

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password

    return ret
  }
})

module.exports = mongoose.model('User', userSchema)