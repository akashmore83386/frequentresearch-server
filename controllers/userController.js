import User from "../models/user.js";

export const signupUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age,
    } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age,
    });

    // Save the user to the database
    await user.save();

    // Respond with a data
    res.status(201).json({ data: user });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error." });
  }
};
