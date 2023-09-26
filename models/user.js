import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "Only alphabets are allowed for first name.",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z]+$/.test(value);
      },
      message: "Only alphabets are allowed for last name.",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate email format
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: "Invalid email address.",
    },
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        // Calculate the age from the date of birth
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();

        // Check if the user is older than 14 years
        return age >= 14;
      },
      message: "User must be at least 14 years old.",
    },
  },
  age: {
    type: Number,
    required: true,
  },
});

// Calculate age before saving
userSchema.pre("save", function (next) {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  this.age = today.getFullYear() - birthDate.getFullYear();
  next();
});

export default mongoose.model("User", userSchema);
