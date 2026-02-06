import mongoose, { Document, Model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface UserI extends Document {
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
  Socket: string | null;
  isOnline: boolean;
  location: {
    type: {
      type: StringConstructor;
      enum: string[];
      default: string;
    };
    coordinate: {
      type: NumberConstructor[];
      default: number[];
    };
  };
}

const UserSchema = new Schema<UserI>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: false,
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
    },
    image: {
      type: String,
    },
    Socket: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinate: {
        type: [Number],
        default: [0, 0],
      },
    },
  },
  { timestamps: true },
);
UserSchema.index({ location: "2dsphere" });
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  if (!this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
