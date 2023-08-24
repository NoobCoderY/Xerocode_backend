import mongoose from "mongoose"

const Schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  userType: {
    type: String,
    enum: ["developer", "orgnization", "company"],
    default: "developer",
  },
  hostingOption: {
    type: String,
    enum: ["AWS", "GitHub",]
  },
 
})

export const UserType = mongoose.model("UserType", Schema)
