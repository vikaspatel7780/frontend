import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/UserSlice";
import USER_API_END_POINT from './Constant'
const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request starts
  
    const isEmail = isValidEmail(usernameOrEmail);
    const email = isEmail ? usernameOrEmail : "";
    const username = isEmail ? "" : usernameOrEmail;
  
    try {
      const result = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      const data = await result.json();
      if (!result.ok) {
        console.log(data.message)
        const errorMessage = data.message || "Something went wrong";
        toast.error(errorMessage);
        return;
      }
      console.log(data.user);
      dispatch(loginSuccess(data?.user));
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(`Something went wrong: ${error.message}`);
    }
    finally {
      setLoading(false); // Set loading to false once request is done
    }
  };
  

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block mb-2" htmlFor="usernameOrEmail">
              Username or Email
            </label>
            <input
              type="text"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4"
              id="usernameOrEmail"
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
              {loading ? "Loading..." : "Login"} {/* Show loading text */}
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <Link to="/register">
            <p className="text-blue-500">Register</p>
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

export default Login;
