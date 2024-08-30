import { motion } from "framer-motion";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import {
  useGetSinglePostApiQuery,
  useSendProposalApiMutation,
} from "../../store/api/post/postApiSlice";
import { toast } from "react-toastify";

const SingleProjectPage = () => {
  const { id } = useParams();
  const {
    data: postItem = [],
    isError,
    isLoading,
  } = useGetSinglePostApiQuery(id);

  const [sendProposalApi] = useSendProposalApiMutation();
  const handleSendProposal = async () => {
    try {
      await sendProposalApi(id).unwrap();
      toast.success("Proposal send succesfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(isError);
    }
  };
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
          <p className="mt-4 text-lg md:text-xl font-semibold text-red-500">
            Error geting posts. check you connection.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Information */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to={`/user/${postItem.user}`}>
              <img
                src={postItem.image}
                alt={postItem.firstname}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
            </Link>

            <div>
              <Link to={`/user/${postItem.user}`}>
                <h2 className="text-lg font-bold">
                  {postItem.firstname} {postItem.lastname}
                </h2>
              </Link>
              {postItem.timeAgo}
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold"></span>{" "}
            {moment(postItem.createdAt).format("YYYY-MM-DD")}
          </p>
        </div>

        {/* Project Title */}
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {postItem.title}
        </motion.h1>

        {/* Project Description */}
        <motion.p
          className="bg-aliceblue p-4 rounded-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {postItem.description}
        </motion.p>

        {/* Skills */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-semibold mb-2">Skills Required:</h3>
          <div className="flex flex-wrap gap-2">
            {postItem.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-300"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Project Details */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h3 className="font-semibold mb-1">Current Members:</h3>
            <div className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full border border-blue-300 flex items-center justify-center">
              {postItem.currentMembersCount} / {postItem.maximumMembersCount}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Category:</h3>
            <p className="text-gray-700">{postItem.category}</p>
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div
          className="bg-aliceblue p-4 rounded-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-semibold mb-1">Requirements:</h3>
          <p className="text-gray-700">{postItem.requirements}</p>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleSendProposal();
            }}
          >
            Send Proposal
          </motion.button>
          <motion.button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Favorites
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SingleProjectPage;
