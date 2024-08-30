import { Schema, SchemaTypes, model } from "mongoose";

const applicantSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const proposalSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: SchemaTypes.ObjectId,
      ref: "Post",
      required: true,
    },
    profileId: {
      type: SchemaTypes.ObjectId,
      ref: "Profile",
      required: true,
    },
    applicants: {
      type: [applicantSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Proposal = model("Proposal", proposalSchema);

export default Proposal;
