import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useSelector, useDispatch } from "react-redux"; // Combine import statements
import { allBlog } from "../redux/UserSlice";
import USER_API_END_POINT from "./Constant"
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.user.blogInfo); // Correct state selector
  const user = useSelector((state) => state.user.userInfo); // Correct state selector

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${USER_API_END_POINT}/allPost`, {
          method: 'GET', // Correct HTTP method for fetching data
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' // Correct way to include credentials
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          dispatch(allBlog(data.blog)); // Dispatch action to update state
        } else {
          throw new Error('Failed to fetch blogs');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [dispatch]); // Add dispatch to the dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(blogs)

  return (
    <div className="home">
      <div className="container mx-auto p-6 bg-slate-200">
        <h1 className="text-4xl font-bold mb-16 text-center">Welcome to My Website</h1>
        <div className="flex justify-center gap-10 flex-wrap">
          {blogs && blogs.length > 0 ? ( // Check if blogs is defined and is an array
            blogs.map(blog => (
              <BlogCard 
                key={blog._id} 
                mainUserId={user._id}
                userId={blog.author._id}
                Id={blog._id} 
                title={blog.title} 
                content={blog.content} 
                author={blog?.author?.fullName} 
                date={new Date(blog.createdAt).toLocaleDateString()} 
              />
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
