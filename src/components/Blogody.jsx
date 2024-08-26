import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";

function BlogDetail() {
  const { id } = useParams();
  const data = useSelector((state) => state.user.blogInfo);
  console.log(data);

  // Ensure data is an array and find the blog with the matching id
  if (!data || !Array.isArray(data)) {
    return <p>Loading...</p>; // Show a loading or error message if data is not available
  }

  // Find the blog with the matching id
  const blog = data.find((item) => item._id === id);
  if (!blog) {
    return <p>Blog not found.</p>; // Handle case where blog with given id is not found
  }

  return (
    <div className="w-[100%] mx-auto py-7">
      <div className="sm:w-[100%] md:w-[70%] lg:w-[70%] mx-auto border px-16 py-10 rounded-md bg-slate-200">
        <h2 className="text-2xl mt-5 font-semibold">{blog.title}</h2>

        <p className="flex items-center text-xl gap-2 mt-2">
          <CiUser className="text-xl" />
          {blog.author?.fullName || "Unknown Author"} {/* Display author's full name or fallback */}
        </p>

        <p className="mt-1 text-xl">Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
        <p className="mt-1 text-xl">Read Time: {blog.reading_time || 'N/A'}</p>
        {/* <p className="mt-1 text-xl">Content: {blog.content}</p> */}

        <div className="w-[100%] mt-10">
          <h1 className="text-2xl font-semibold">Content:</h1>
          <p className="text-[1.2rem] indent-4">
            {blog.content} {/* Display the content of the blog */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
