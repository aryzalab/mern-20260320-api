import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await userService.getAll();

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const user = await userService.updateProfileImage(req.user._id, req.file);

    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  createUser,
  getAllUsers,
  getById,
  updateUser,
  deleteUser,
  updateProfileImage,
};
