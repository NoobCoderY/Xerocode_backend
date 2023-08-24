import mongoose from "mongoose"

const Schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  userType: {
    type: String,
    enum: ["Developer", "Orgnization", "Company"],
    default: "Developer",
  },
  hostingOption: {
    type: String,
    enum: ["AWS", "GitHub",]
  },
  companyName: {
    type: String
  },
  developerName: {
    type: String
  },
  orgnizationName: {
    type: String
  }


})

export const UserType = mongoose.model("UserType", Schema)