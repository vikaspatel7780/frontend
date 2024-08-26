import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import USER_API_END_POINT from "./Constant"

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request starts

    try {
      const response = await fetch(`${USER_API_END_POINT}/register`, {
        method: "POST",
       credentials: 'include',
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        console.log(data.message)
        return;
      }

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(`Error registering user: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false once request is done
    }
  };

  return (
    <div className="h-screen w-[100%] flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
              id="fullName"
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="username">
              UserName
            </label>
            <input
              type="text"
              value={username}
              autoComplete="new-password"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
              id="username"
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
              id="email"
            />
          </div>
          <div>
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
              id="password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Registering..." : "Register"} {/* Show loading text */}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <Link to="/login">
            <p className="text-blue-500">Login</p>
          </Link>
          <span className="mx-2">|</span>
          <Link to="/forgetPassword">
            <p className="text-blue-500">Forget Password</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
