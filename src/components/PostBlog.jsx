import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import USER_API_END_POINT from './Constant'

const Post = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${USER_API_END_POINT}/posts`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ title, content, userId: userInfo._id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error Posting Blog");
      }

      toast.success(data.message);
      navigate("/");
    } catch (error) {
      console.error("Error Posting Blog:", error);
      toast.error(`Error Posting Blog: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
      <div className="max-w-lg w-full p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Post a Blog</h2>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label className="block mb-2 text-gray-600 font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              id="title"
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-600 font-medium" htmlFor="content">
              Content
            </label>
            <textarea
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              id="content"
              placeholder="Write your blog content here"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
