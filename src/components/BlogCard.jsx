import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import USER_API_END_POINT from "./Constant";
import { useDispatch } from "react-redux";
import { removeBlog } from "../redux/UserSlice";

function BlogCard({ title, content, author, date, Id, userId, mainUserId }) {
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  const deleteHandle = async () => {
    setLoading(true); // Set loading to true when delete starts
    try {
      const response = await fetch(`${USER_API_END_POINT}/delete/${Id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Delete failed");
        setLoading(false); // Reset loading state on failure
        return;
      }
      toast.success(data.message);
      dispatch(removeBlog(Id));
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed: " + error.message);
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  const truncatedContent =
    content.split(" ").slice(0, 40).join(" ") +
    (content.split(" ").length > 40 ? "..." : "");

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg rounded-t-lg p-3 w-[600px] h-[355px] transition-transform transform hover:scale-105 flex flex-col justify-between">
      <div>
        <Link to={`/blog/${Id}`} className="block">
          <p className="text-2xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors duration-300">
            {title}
          </p>
        </Link>
        <Link to={`/blog/${Id}`} className="block">
          <p className="text-gray-800 mb-2 text-justify leading-relaxed">
            {truncatedContent}
          </p>
        </Link>
      </div>

      <div className="flex flex-row justify-between items-start">
        <div>
          <div className="flex items-center text-gray-600 mb-2">
            <CiUser className="text-gray-500 mr-2" size={24} />
            <span className="font-medium text-lg text-gray-800">{author}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            Published: <span className="font-medium text-gray-800">{date}</span>
          </p>
        </div>

        {userId === mainUserId && (
          <div className="flex space-x-4">
            {loading ? (
              <div className="text-red-500">Deleting...</div> // Loading indicator
            ) : (
              <>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-300 focus:outline-none"
                  title="Delete"
                  onClick={deleteHandle}
                  disabled={loading} // Disable button while loading
                >
                  <FaTrash size={22} />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300 focus:outline-none"
                  title="Edit"
                  onClick={deleteHandle}
                  disabled={loading} // Disable button while loading
                >
                  <FaEdit size={22} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
