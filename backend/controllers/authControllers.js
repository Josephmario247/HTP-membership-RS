import User from "./../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: user.role },
      message: `Welcome ${user.name} to HTP Registration System` 
    });
  } catch (error) {
   return res.status(500).json({ success: false, error: error.message });
  }
};
const verify = async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};
export { login, verify };
