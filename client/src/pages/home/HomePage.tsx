import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Post from "../../components/home/Post";
import Ads from "../../components/Ads";
import { useGetPostApiQuery } from "../../store/api/post/postApiSlice";
import { useGetUserProfileApiQuery } from "../../store/api/user/userApiSlice";

// Define the type for a single post based on your API response
interface PostData {
  _id: string;
  user: string;
  imageurl: string;
  firstname: string;
  lastname: string;
  title: string;
  description: string;
  skills: string[];
  currentMembersCount: number;
  maximumMembersCount: number;
  category: string;
  requirements: string;
  createdAt: string;
  updatedAt: string;
  timeAgo: string;
  deadline: string;
}

const HomePage: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const { data: user, isLoading: isUserLoading } =
    useGetUserProfileApiQuery("");
  const { data: posts = [], isLoading, isError } = useGetPostApiQuery("");

  if (!isLoggedIn) {
    return <Navigate to="/welcome" replace />;
  }

  if (isUserLoading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
          <p className="mt-4 text-xl font-semibold text-blue-500">
            Loading user data...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    return <Navigate to="/configure" replace />;
  }

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
          <p className="mt-4 text-xl font-semibold text-blue-500">
            Loading posts...
          </p>
        </div>
      </motion.div>
    );
  }

  if (isError) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="text-red-500 text-6xl"
            animate={{
              rotate: [0, -10, 10, -10, 0],
              transition: { repeat: Infinity, duration: 1.5 },
            }}
          >
            &#9888;
          </motion.div>
          <p className="mt-4 text-xl font-semibold text-red-500">
            Error fetching posts.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <div className="posts-container">
        {posts.map((post: PostData) => (
          <Post
            key={post._id}
            postId={post._id}
            firstname={post.firstname}
            lastname={post.lastname}
            imageurl={post.imageurl}
            title={post.title}
            description={post.description}
            skills={post.skills}
            currentMembersCount={post.currentMembersCount}
            maximumMembersCount={post.maximumMembersCount}
            category={post.category}
            requirements={post.requirements}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            timeAgo={post.timeAgo}
            deadline={post.deadline}
          />
        ))}
      </div>
      <Ads />
    </>
  );
};

export default HomePage;
