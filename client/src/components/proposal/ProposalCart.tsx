import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash } from "react-icons/fi";
import { useDeletePostApiMutation } from "../../store/api/post/postApiSlice";
import { toast } from "react-toastify";

interface ProposalCartProps {
  proposalId: string;
  title: string;
  createdAt: string;
  refetch: () => void; // Pass down the refetch function from parent
}

const ProposalCart: React.FC<ProposalCartProps> = ({
  title,
  createdAt,
  proposalId,
  refetch,
}) => {
  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Initialize the mutation hook
  const [deletePost] = useDeletePostApiMutation();

  // Handle the delete action
  const handleDelete = async (proposalId: string) => {
    try {
      await deletePost(proposalId).unwrap();
      toast.success("Post deleted successfully");

      // Refetch the data after successful deletion
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error deleting post");
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg w-full sm:w-[350px] mt-7 rounded-xl p-6 mx-auto transform transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          {title}
        </h1>
        <FiTrash
          className="text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
          onClick={() => handleDelete(proposalId)}
          size={20}
        />
      </div>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        {formatDate(createdAt)}
      </p>
      <Link to={`/proposal/${proposalId}`}>
        <motion.button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
          whileTap={{ scale: 0.95 }}
        >
          View Proposal
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default ProposalCart;
