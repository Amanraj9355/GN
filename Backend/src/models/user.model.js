import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    image: {
      type: String,
      default: "",
    },
    cartData: {
      type: Object,
      default: {},
    },
    wishlistData: {
      type: Object,
      default: {},
    },
    address: {
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      pincode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
    },
    phoneNumber: {
      type: String,
      default: "",
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
