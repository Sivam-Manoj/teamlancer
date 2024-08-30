import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  useCreateUserProfileApiMutation,
  useGetUserProfileApiQuery,
} from "../../store/api/user/userApiSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProfileFormValues {
  image: FileList;
  firstname: string;
  lastname: string;
  address: string;
  district: string;
  postalcode: number;
  about: string;
  skills: string;
  linkedin?: string;
  github?: string;
  resume?: FileList;
}

const ConfigureProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>();

  const navigate = useNavigate();
  const [createUserProfileApi, { isError, isLoading }] =
    useCreateUserProfileApiMutation();

  const { data: user } = useGetUserProfileApiQuery("");

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("image", data.image[0]); // Image file
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("address", data.address);
      formData.append("district", data.district);
      formData.append("postalcode", data.postalcode.toString());
      formData.append("about", data.about);
      formData.append("skills", data.skills); // Comma-separated skills
      if (data.linkedin) formData.append("linkedin", data.linkedin);
      if (data.github) formData.append("github", data.github);
      if (data.resume) formData.append("pdf", data.resume[0]); // Resume file

      // Call API to create user profile
      await createUserProfileApi(formData).unwrap();
      toast.success("Profile created successfully!");
      navigate("/");
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Profile creation failed!");
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
          <p className="mt-4 text-xl font-semibold text-red-500">
            Error fetching posts.
          </p>
        </div>
      </motion.div>
    );
  }

  if (user && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isLoggedIn && !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.div
      className="container mx-auto p-4 max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Configure Your Profile
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Profile Image */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Profile Image:</label>
          <input
            type="file"
            {...register("image", { required: "Profile image is required" })}
            className="p-2 border rounded-md"
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* First Name */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">First Name:</label>
          <input
            type="text"
            {...register("firstname", { required: "First name is required" })}
            className="p-2 border rounded-md"
          />
          {errors.firstname && (
            <p className="text-red-500 text-sm">{errors.firstname.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Last Name:</label>
          <input
            type="text"
            {...register("lastname", { required: "Last name is required" })}
            className="p-2 border rounded-md"
          />
          {errors.lastname && (
            <p className="text-red-500 text-sm">{errors.lastname.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Address:</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="p-2 border rounded-md"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* District */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">District:</label>
          <input
            type="text"
            {...register("district", { required: "District is required" })}
            className="p-2 border rounded-md"
          />
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Postal Code:</label>
          <input
            type="number"
            {...register("postalcode", { required: "Postal code is required" })}
            className="p-2 border rounded-md"
          />
          {errors.postalcode && (
            <p className="text-red-500 text-sm">{errors.postalcode.message}</p>
          )}
        </div>

        {/* About Section */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">About:</label>
          <textarea
            {...register("about", {
              required: "About section is required",
              maxLength: 1000,
            })}
            className="p-2 border rounded-md resize-none h-24"
          />
          {errors.about && (
            <p className="text-red-500 text-sm">{errors.about.message}</p>
          )}
        </div>

        {/* Skills */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">
            Skills (comma-separated):
          </label>
          <input
            type="text"
            {...register("skills", { required: "Skills are required" })}
            className="p-2 border rounded-md"
          />
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills.message}</p>
          )}
        </div>

        {/* LinkedIn URL */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">LinkedIn URL (optional):</label>
          <input
            type="url"
            {...register("linkedin")}
            className="p-2 border rounded-md"
          />
        </div>

        {/* GitHub URL */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">GitHub URL (optional):</label>
          <input
            type="url"
            {...register("github")}
            className="p-2 border rounded-md"
          />
        </div>

        {/* Resume */}
        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Resume:</label>
          <input
            type="file"
            {...register("resume")}
            className="p-2 border rounded-md"
            accept=".pdf,.doc,.docx"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Finish Profile
        </button>
      </form>
    </motion.div>
  );
};

export default ConfigureProfile;
