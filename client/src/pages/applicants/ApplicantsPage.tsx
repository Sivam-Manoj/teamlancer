import { Link, useParams } from "react-router-dom";
import { useGetProposalByIdQuery } from "../../store/api/post/postApiSlice";
import { motion } from "framer-motion";

interface Applicant {
  _id: string;
  firstname: string;
  lastname: string;
  imageurl: string;
  userId: string;
}

interface Proposal {
  _id: string;
  user: string;
  postId: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  applicants: Applicant[];
}

const ApplicantsPage = () => {
  const { id } = useParams();
  const { data: proposals, isLoading, isError } = useGetProposalByIdQuery(id);

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
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
        className="flex items-center justify-center min-h-screen"
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

  if (!proposals || proposals.length === 0)
    return (
      <p className="text-center text-lg font-medium pt-44 text-gray-500 min-h-[80vh]">
        No proposals found.
      </p>
    );

  return (
    <div className=" container mx-auto px-4 py-8">
      {proposals.map((proposal: Proposal) => (
        <div key={proposal._id} className="mb-12">
          <div className="text-center mb-8">
            <motion.h2
              className="text-4xl font-bold text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Applicants Details
            </motion.h2>
            <p className="text-lg text-gray-600">
              {" "}
              <span className="font-semibold">
                {new Date(proposal.createdAt).toLocaleString()}
              </span>
            </p>
          </div>

          {proposal.applicants && proposal.applicants.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {proposal.applicants.map((applicant: Applicant) => (
                <motion.div
                  key={applicant._id}
                  className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 bg-white shadow-md rounded-lg text-center hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={applicant.imageurl}
                    alt={`${applicant.firstname} ${applicant.lastname}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-inner"
                  />
                  <div className="text-2xl font-bold text-gray-800">
                    {applicant.firstname} {applicant.lastname}
                  </div>
                  <br />
                  <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                      Send Mail
                    </button>
                    <Link
                      to={`/user/${applicant.userId}`}
                      className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500 min-h-screen">
              No applicants found for this proposal.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicantsPage;
