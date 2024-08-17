import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useGetUserProfileApiQuery } from "../../store/api/user/userApiSlice";

interface Profile {
  image: string;
  imageurl: string;
  firstname: string;
  lastname: string;
  address: string;
  district: string;
  postalcode: number;
  about: string;
  skills: string[];
  linkedin?: string;
  github?: string;
  resume?: string;
}

const ProfilePage: React.FC = () => {
  const { data: user, isError, isLoading } = useGetUserProfileApiQuery("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>("");
  const { handleSubmit, register } = useForm<Profile>({
    defaultValues: profile || {},
  });

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const onSubmit = (data: Profile) => {
    console.log("Updated profile data:", data);
    setProfile(data);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill && profile && !profile.skills.includes(newSkill)) {
      setProfile((prev) => ({
        ...prev!,
        skills: [...prev!.skills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile((prev) => ({
      ...prev!,
      skills: prev!.skills.filter((s) => s !== skill),
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !profile) return <div>Error loading profile</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={profile.imageurl}
                alt={`${user.firstname} ${user.lastname}`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 border rounded-md p-2"
                  onChange={(e) => {
                    if (e.target.files) {
                      console.log("New profile image:", e.target.files[0]);
                    }
                  }}
                />
              )}
            </div>
            <div className="col-span-2">
              {isEditing ? (
                <>
                  <input
                    {...register("firstname")}
                    className="text-2xl font-bold mb-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                  <input
                    {...register("lastname")}
                    className="text-2xl font-bold mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-1">
                    {profile.firstname} {profile.lastname}
                  </h1>
                  <p className="text-gray-600 mb-2">
                    {profile.address}, {profile.district}, {profile.postalcode}
                  </p>
                </>
              )}
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
            {isEditing ? (
              <textarea
                {...register("about")}
                className="w-full h-24 p-2 border rounded-md resize-none"
              />
            ) : (
              <p>{profile.about}</p>
            )}
          </motion.div>

          {/* Skills */}
          <motion.div
            className="bg-gray-100 p-4 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills[0].split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full border border-blue-300 flex items-center"
                >
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      className="ml-2 text-red-600"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      x
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border rounded-md p-2 flex-grow"
                  placeholder="Add a new skill"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Skill
                </button>
              </div>
            )}
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-col gap-4 md:flex-row md:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-2">Social Media</h2>
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              {isEditing ? (
                <>
                  <input
                    {...register("linkedin")}
                    className="border rounded-md p-2"
                    placeholder="LinkedIn URL"
                  />
                  <input
                    {...register("github")}
                    className="border rounded-md p-2"
                    placeholder="GitHub URL"
                  />
                </>
              ) : (
                <>
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="text-blue-700 text-2xl" />
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="text-gray-800 text-2xl" />
                    </a>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Resume */}
          {profile.resume && (
            <motion.div
              className="bg-gray-100 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-2">Resume</h2>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <HiOutlineDocumentText className="mr-2" /> View Resume
              </a>
            </motion.div>
          )}

          {/* File Upload */}
          {isEditing && (
            <motion.div
              className="bg-gray-100 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-2">Upload New Resume</h2>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full border rounded-md p-2"
                onChange={(e) => {
                  if (e.target.files) {
                    console.log("New resume file:", e.target.files[0]);
                  }
                }}
              />
            </motion.div>
          )}

          {/* Save/Cancel Buttons */}
          {isEditing ? (
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
