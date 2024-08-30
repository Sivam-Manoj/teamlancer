import { motion } from "framer-motion";
import ProposalCart from "../../components/proposal/ProposalCart";
import { useGetPostByUserIdQuery } from "../../store/api/post/postApiSlice";

interface Proposal {
  _id: string;
  postId: string;
  title: string;
  createdAt: string;
  refetch: () => void; // Pass down the refetch function from parent
}

const TeamsPage = () => {
  const {
    data: proposal,
    isLoading,
    isError,
    refetch,
  } = useGetPostByUserIdQuery("");

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
      <div className="min-h-[75vh] mb-11 w-full grid grid-cols-1 md:grid-col-3 lg:grid-cols-4 my-3 ">
        {Array.isArray(proposal) && proposal.length > 0 ? (
          proposal.map((proposal: Proposal) => (
            <div className="ml-5">
              <ProposalCart
                key={proposal._id}
                proposalId={proposal._id}
                title={proposal.title}
                createdAt={proposal.createdAt}
                refetch={refetch}
              />
            </div>
          ))
        ) : (
          <motion.div
            className="flex absolute right-[45%] top-44 "
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
                no proposals found.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default TeamsPage;
