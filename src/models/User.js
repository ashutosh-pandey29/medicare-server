import mongoose from "mongoose";

const userDBSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username must be less than 30 characters"],
    },

    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      default: null, //! Social login users authenticate via provider, so no local password is stored
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      default: "user",
    },

    provider: {
      type: String,
      enum: ["google", "linkedin", "instagram"],
      default: null,
    },

    providerId: {
      type: String,
      default: null,
      index: true,

      required: function () {
        return this.provider !== null;
      },
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    emailVerificationToken: {
      type: String,
      default: null,
      trim: true,
      select: false,
    },

    emailVerificationTokenExpire: {
      type: Date,
      default: () => Date.now() + 24 * 60 * 60 * 1000,
      select: false,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    refreshTokenExpireAt: {
      type: Date,
      default: null,
      select: false,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    blockedUntil: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordTokenExpire: {
      type: Date,
      select: false,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userDBSchema);
export default User;
