import moment from "moment";
import { Schema, model, SchemaTypes } from "mongoose";

const postSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: false,
    },
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    currentMembersCount: {
      type: Number,
      required: true,
      default: 0,
    },
    maximumMembersCount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    requirements: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

postSchema.methods.formatTimestamps = function (timezone = "Asia/Colombo") {
  return {
    createdAt: moment(this.createdAt)
      .tz(timezone)
      .format("YYYY-MM-DD HH:mm:ss"),
    updatedAt: moment(this.updatedAt)
      .tz(timezone)
      .format("YYYY-MM-DD HH:mm:ss"),
  };
};

// Add a virtual field for relative time
postSchema.virtual("timeAgo").get(function () {
  const now = moment();
  const createdAt = moment(this.createdAt);
  const diffInSeconds = now.diff(createdAt, "seconds");

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  const diffInMinutes = now.diff(createdAt, "minutes");
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  const diffInHours = now.diff(createdAt, "hours");
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  const diffInDays = now.diff(createdAt, "days");
  return `${diffInDays} days ago`;
});

// Ensure virtual fields are serialized
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

// Create and export the model
const Post = model("Post", postSchema);
export default Post;
