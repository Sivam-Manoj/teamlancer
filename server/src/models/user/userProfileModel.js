import { Schema, model, SchemaTypes } from "mongoose";

const profileSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    imageurl: {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    skills: {
      type: [String],
      required: true,
    },
    linkedin: {
      type: String,
      required: false,
    },
    github: {
      type: String,
      required: false,
    },
    resume: {
      type: String, //image file location
    },
    resumeurl: {
      type: String,
    },
    configured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);

export default Profile;
