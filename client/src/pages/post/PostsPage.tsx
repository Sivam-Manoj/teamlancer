import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { useCreatePostApiMutation } from "../../store/api/post/postApiSlice";
import { toast } from "react-toastify";

const PostsPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: [""],
    currentMembersCount: 0,
    maximumMembersCount: 1,
    category: "",
    requirements: "",
    deadline: "", // Added deadline to formData
  });

  const [createPostApi, { isLoading, isError }] = useCreatePostApiMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSkillsChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPostApi(formData).unwrap();
      toast.success("Post created successfully");
      setFormData({
        title: "",
        description: "",
        skills: [""],
        currentMembersCount: 0,
        maximumMembersCount: 1,
        category: "",
        requirements: "",
        deadline: "", // Reset deadline after form submission
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Handle error, e.g., show an error message
      toast.error("Error while creating post");
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

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <motion.h2
        className="text-2xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create a New Post
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block font-semibold mb-1 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Skills</label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillsChange(index, e.target.value)}
                  className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
              </div>
            ))}
            <motion.button
              type="button"
              onClick={addSkill}
              className="text-blue-500 hover:text-blue-700 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Add Skill
            </motion.button>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">
              Current Members Count
            </label>
            <input
              type="number"
              name="currentMembersCount"
              value={formData.currentMembersCount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              min={1}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">
              Maximum Members Count
            </label>
            <input
              type="number"
              name="maximumMembersCount"
              value={formData.maximumMembersCount}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              min={1}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full h-11 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Programming & IT">Programming & IT</option>
              <option value="Business">Business</option>
              <option value="Art">Art</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Science">Science</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>

          {/* Added Deadline Input */}
          <div>
            <label className="block font-semibold mb-1 text-sm">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Post
        </motion.button>
      </motion.form>
    </div>
  );
};

export default PostsPage;
