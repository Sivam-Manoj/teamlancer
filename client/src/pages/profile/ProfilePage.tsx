import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  useGetUserProfileApiQuery,
  useUpdateUserProfileApiMutation,
} from "../../store/api/user/userApiSlice";
import { toast } from "react-toastify";

interface Profile {
  image?: FileList | null; // Changed to File
  user: string;
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
  resumeurl?: string;
  pdf?: FileList; // Changed to FileLis
}

const ProfilePage: React.FC = () => {
  const {
    data: user,
    isError,
    isLoading,
    refetch,
  } = useGetUserProfileApiQuery("");
  const [updateUserProfile] = useUpdateUserProfileApiMutation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>("");
  const { handleSubmit, register, setValue } = useForm<Profile>({
    defaultValues: user || {
      imageurl: "",
      user: "",
      firstname: "",
      lastname: "",
      address: "",
      district: "",
      postalcode: 0,
      about: "",
      skills: [],
    },
  });

  const onSubmit = async (data: Profile) => {
    try {
      const formData = new FormData();

      // Append image file if present
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      // Append resume file if present
      if (data.pdf && data.pdf.length > 0) {
        formData.append("pdf", data.pdf[0]);
      }

      // Append other fields
      formData.append("user", data.user);
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("address", data.address);
      formData.append("district", data.district);
      formData.append("postalcode", String(data.postalcode));
      formData.append("about", data.about);
      formData.append("skills", JSON.stringify(data.skills));
      if (data.linkedin) formData.append("linkedin", data.linkedin);
      if (data.github) formData.append("github", data.github);

      await updateUserProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
      refetch();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleAddSkill = () => {
    if (newSkill && user && !user.skills.includes(newSkill)) {
      setValue("skills", [...user.skills, newSkill]); // Use setValue to update form value
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setValue(
      "skills",
      user.skills.filter((s: string) => s !== skill)
    ); // Use setValue to update form value
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
            Loading profile...
          </p>
        </div>
      </motion.div>
    );
  }

  if (isError || !user) {
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
            Error fetching profile.
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
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col items-center md:items-start">
              <img
                src={user.imageurl}
                alt={`${user.firstname} ${user.lastname}`}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              {isEditing && (
                <input
                  type="file"
                  {...register("image", {
                    required: "Profile image is required",
                  })}
                  className="p-2 border rounded-md"
                  accept="image/*"
                />
              )}
            </div>
            <div className="col-span-2">
              {isEditing ? (
                <>
                  <input
                    {...register("firstname")}
                    placeholder="Enter first name"
                    className="text-2xl font-bold mb-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                  <input
                    {...register("lastname")}
                    placeholder="Enter last name"
                    className="text-2xl font-bold mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-1">
                    {user.firstname} {user.lastname}
                  </h1>

                  <p className="text-gray-600 mb-2">
                    {user.address}, {user.district}, {user.postalcode}
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
              <p>{user.about}</p>
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
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill: string, index: number) => (
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
                ))
              ) : (
                <p>No skills added yet.</p>
              )}
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
            className="bg-gray-100 p-4 rounded-lg mb-6"
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
                  {user.linkedin && (
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="text-blue-700 text-2xl" />
                    </a>
                  )}
                  {user.github && (
                    <a
                      href={user.github}
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
          {user.resumeurl && (
            <motion.div
              className="bg-gray-100 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold mb-2">Resume</h2>
              <a
                href={user.resumeurl}
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
                accept=".pdf"
                className="w-full border rounded-md p-2"
                {...register("pdf")}
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
