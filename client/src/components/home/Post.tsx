import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Define animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" },
};

const buttonVariants = {
  hover: { scale: 1.1 },
};

interface PostProps {
  imageurl: string;
  postId: string;
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

const Post: React.FC<PostProps> = ({
  imageurl,
  firstname,
  lastname,
  title,
  description,
  postId,
  createdAt,
  timeAgo,
  deadline,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="max-w-sm md:max-w-4xl w-full bg-slate-100 p-6 rounded-3xl shadow-lg mx-auto md:ml-[25%] mt-6 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <img
          src={imageurl}
          alt={firstname}
          className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 object-cover border-gray-300 mr-4"
        />
        <div>
          <h4 className="font-semibold text-md -mt-5 md:text-lg">
            {firstname} {lastname}
          </h4>
          <div className="text-xs md:text-sm text-gray-500">
            <div className="flex justify-between gap-[8rem]">
              <span>{new Date(createdAt).toLocaleDateString()}</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-start font-bold text-md md:text-2xl mb-3 text-gray-800">
        {title.substring(0, 50)}
      </h3>
      <p className="text-justify text-sm md:text-base text-gray-600 bg-gray-200 p-4 rounded-lg mb-4 line-clamp-3">
        {description.substring(0, 100)}...
      </p>

      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-xs md:text-sm">
          Deadline: {deadline}
        </span>
        <div className="flex gap-2">
          <motion.div variants={buttonVariants} whileHover="hover">
            <Link to={`/project/${postId}`}>
              <button className="bg-green-500 text-white text-xs md:text-sm py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                View Info
              </button>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants} whileHover="hover">
            <button className="bg-blue-500 text-white text-xs md:text-sm py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Send Proposal
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Post;
