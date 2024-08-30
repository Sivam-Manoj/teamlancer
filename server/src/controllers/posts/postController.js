import asyncHandler from "express-async-handler";
import Post from "../../models/posts/postModel.js";
import Profile from "../../models/user/userProfileModel.js";
import Proposal from "../../models/proposals/proposalModel.js";

// Add a new post
export const addPost = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    skills,
    currentMembersCount,
    maximumMembersCount,
    category,
    requirements,
    deadline,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !skills ||
    !maximumMembersCount ||
    !requirements ||
    !deadline
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const profile = await Profile.findOne({ user: req.userId });

  const post = new Post({
    user: req.userId,
    title,
    firstname: profile.firstname,
    lastname: profile.lastname,
    imageurl: profile.imageurl,
    description,
    skills,
    deadline,
    currentMembersCount: currentMembersCount || 0,
    maximumMembersCount,
    category,
    requirements,
  });

  try {
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Fetch all posts
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// Fetch a specific post with user profile information
export const getSinglePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Post ID is required");
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    const postItem = {
      user: post.user,
      image: post.imageurl,
      firstname: post.firstname,
      lastname: post.lastname,
      title: post.title,
      description: post.description,
      skills: post.skills,
      currentMembersCount: post.currentMembersCount,
      maximumMembersCount: post.maximumMembersCount,
      category: post.category,
      requirements: post.requirements,
      timeAgo: post.timeAgo,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
    res.status(200).json(postItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export const getPostByUserId = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.userId });
  if (!posts) {
    res.status(404);
    throw new Error("Posts not found");
  }

  if (posts) {
    res.status(200).json(posts);
  }
});

export const sendProposal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404);
    throw new Error("Post ID not found");
  }

  const profile = await Profile.findOne({ user: req.userId });
  if (!profile) {
    res.status(404);
    throw new Error("User profile not found");
  }

  let proposal = await Proposal.findOne({ postId: id });
  const posts = await Post.findById(id);

  if (posts.user !== req.userId) {
    if (!proposal) {
      proposal = new Proposal({
        user: req.userId,
        postId: id,
        profileId: profile._id,
        applicants: [
          {
            firstname: profile.firstname,
            lastname: profile.lastname,
            imageurl: profile.imageurl,
            userId: profile.user,
          },
        ],
      });
    } else {
      proposal.applicants.push({
        firstname: profile.firstname,
        lastname: profile.lastname,
        imageurl: profile.imageurl,
        userId: profile._id,
      });
    }

    // Save the proposal (either newly created or updated)
    await proposal.save();

    res.status(200).json({ message: "Proposal submitted successfully" });
  }
});

export const getProposalByUserId = asyncHandler(async (req, res) => {
  const proposal = await Proposal.find({ user: req.userId });

  if (!proposal) {
    res.status(404);
    throw new Error("Post not found");
  }
  res.status(200).json(proposal);
});

export const getProposalById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    throw new Error("id not found");
  }
  const proposals = await Proposal.find({ postId: id });

  if (!proposals) {
    res.status(200);
    throw new Error("Post not found");
  }

  res.status(200).json(proposals);
});

export const getUserDetailsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    throw new Error("id not found");
  }
  const proposals = await Profile.find({ user: id });

  if (!proposals) {
    res.status(200);
    throw new Error("Post not found");
  }

  res.status(200).json(proposals);
});

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400); // 400 Bad Request
    throw new Error("Post ID is required");
  }

  const post = await Post.findById(id);

  if (!post) {
    res.status(404); // 404 Not Found
    throw new Error("Post not found");
  }

  await post.deleteOne();

  res.status(200).json({ message: "Post deleted successfully" });
});
