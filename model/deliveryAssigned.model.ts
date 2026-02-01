import mongoose from "mongoose";

interface IDeliveryAssignes {
  _id?: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  broadcastedTo: mongoose.Types.ObjectId[];
  assignedTo: mongoose.Types.ObjectId;
  status: "broadcasted" | "assigned" | "completed";
  acceptedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const DeliverySchema = new mongoose.Schema<IDeliveryAssignes>(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    broadcastedTo: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["broadcasted", "completed", "assigned"],
      default: "broadcasted",
    },
    acceptedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Delivery =
  mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema);

export default Delivery;
