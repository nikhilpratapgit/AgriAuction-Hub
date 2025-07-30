import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [20, "Username must be at most 20 characters"],
    index: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // required only if no Google login
    },
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["farmer", "buyer", "admin"],
    default: "buyer",
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  photo: {
  type: String,
  default: '',
},
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Password Hash Middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Password Validation Method
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
