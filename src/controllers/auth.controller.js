import authService from "../services/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  const input = req.body;

  try {
    const user = await authService.login(req.body);

    const token = jwt.createToken(user);

    res.cookie("authToken", token, {
      maxAge: 86400 * 1000,
    });

    res.json({ ...user, token });
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const register = async (req, res) => {
  const input = req.body;

  try {
    const user = await authService.register(input);

    const token = jwt.createToken(user);

    res.cookie("authToken", token, {
      maxAge: 86400 * 1000,
    });

    res.json({ ...user, token });
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  const input = req.body;

  try {
    const data = await authService.forgotPassword(input?.email);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

const resetPassword = async (req, res) => {
  const input = req.body;

  try {
    const data = await authService.resetPassword(input);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};

export default { register, login, forgotPassword, resetPassword };
