// Re-export from modular auth controllers for backward compatibility
export { registerUser } from "./auth/registerController.js";
export { loginUser } from "./auth/loginController.js";
export { logoutUser } from "./auth/logoutController.js";
export { refreshToken, getCurrentUser } from "./auth/tokenController.js";
