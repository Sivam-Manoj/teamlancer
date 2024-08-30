import React from "react";
import { motion } from "framer-motion";
import { useGetUserProfileByIdApiQuery } from "../../store/api/user/userApiSlice";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaMapMarkerAlt, FaCity, FaEnvelope } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const {
    data: profile,
    isError,
    isLoading,
  } = useGetUserProfileByIdApiQuery(id);

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

  if (isError || !profile)
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
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-center">
          <div className="flex flex-col items-center md:items-start">
            <img
              src={profile.imageurl}
              alt={`${profile.firstname} ${profile.lastname}`}
              className="w-24 h-24 md:w-44 md:h-44 rounded-xl object-cover mb-4"
            />
          </div>
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              {profile.firstname} {profile.lastname}
            </h1>
            <motion.div
              className="text-gray-600 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-500 mr-2 mt-1" />
                <div className="space-y-1">
                  {profile.address
                    .split(",")
                    .map((part: string, index: number) => (
                      <span key={index} className="block font-medium">
                        {part.trim()},
                      </span>
                    ))}
                </div>
              </div>
              <p className="flex items-center">
                <FaCity className="text-gray-500 mr-2" />
                <span>{profile.district}</span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span>{profile.postalcode}</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* About Section */}
        <motion.div
          className="bg-gray-100 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p>{profile.about}</p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="bg-gray-100 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills[0]
              .split(",")
              .map((skill: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-300"
                >
                  {skill}
                </span>
              ))}
          </div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="bg-gray-100 p-4 rounded-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-2">Social Media</h2>
          <div className="flex gap-4">
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 text-2xl"
              >
                <FaLinkedin />
              </a>
            )}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 text-2xl"
              >
                <FaGithub />
              </a>
            )}
          </div>
        </motion.div>

        {/* Resume Section */}
        {profile.resume && (
          <motion.div
            className="bg-gray-100 p-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">Resume</h2>
            <a
              href={profile.resumeurl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline"
            >
              <HiOutlineDocumentText className="mr-2" /> View Resume
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
