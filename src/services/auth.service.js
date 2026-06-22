import ResetPassword from "../models/ResetPassword.js";
import config from "../config/config.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (!user) {
    throw {
      status: 404,
      message: "User not found.",
    };
  }

  if (!user.isActive) {
    throw {
      status: 400,
      message: "User is inactive.",
    };
  }

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch) {
    throw {
      status: 400,
      message: "Passwords do not match.",
    };
  }

  return {
    _id: user._id,
    address: user.address,
    email: user.email,
    isActive: user.isActive,
    name: user.name,
    phone: user.phone,
    roles: user.roles,
    profileImageUrl: user?.profileImageUrl,
  };
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });

  if (user) {
    throw {
      status: 409,
      message: "User already exists.",
    };
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(data.password, salt);

  delete data.roles;

  const createdUser = await User.create({
    ...data,
    password: hashedPassword,
  });

  return {
    _id: createdUser._id,
    address: createdUser.address,
    email: createdUser.email,
    isActive: createdUser.isActive,
    name: createdUser.name,
    phone: createdUser.phone,
    roles: createdUser.roles,
    profileImageUrl: user?.profileImageUrl,
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw {
      status: 404,
      message: "User not found.",
    };
  }

  const token = crypto.randomUUID();

  await ResetPassword.create({
    userId: user._id,
    token: token,
  });

  const link = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  sendEmail({
    recipient: email,
    subject: "Reset password link",
    html: `
      <div
        style="
          padding: 16px;
          font-family: sans-serif
        "
      >
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${link}"
          style="
            background-color: steelblue;
            color: white;
            text-decoration: none;
            padding: 8px 32px;
            border-radius: 5px;
          "
          >Reset password</a
        >
      </div>
    `,
  });

  return {
    message: "Reset password link sent to your email.",
  };
};

const resetPassword = async (input) => {
  const data = await ResetPassword.findOne({
    userId: input.userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token != input.token) {
    throw {
      status: 400,
      message: "Invalid or expired link.",
    };
  }

  if (data.isUsed) {
    throw {
      status: 400,
      message: "Link already used.",
    };
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(input.password, salt);

  await User.findByIdAndUpdate(input.userId, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return { message: "Password reset successful." };
};

export default { register, login, forgotPassword, resetPassword };
