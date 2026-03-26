import User from "../../models/User.js";
import { COOKIE_OPTIONS } from "../../config/cookieConfig.js";

export const logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      const user = await User.findOne({ refreshToken: token });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken", COOKIE_OPTIONS);

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
