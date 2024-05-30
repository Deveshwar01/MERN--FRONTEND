import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, STATUSES } from "../redux/loginAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import server from "../config";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userLogin.status);
  const userRole = useSelector(
    (state) => state.userLogin.data && state.userLogin.data.user.role
  );

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect based on user role
  const handleRedirect = () => {
    if (userRole === "admin") {
      navigate("/admin");
    } else if (userRole === "user") {
      navigate("/ads");
    }
  };

  // Redirect when userRole changes
  useEffect(() => {
    if (userRole) {
      handleRedirect();
    }
  }, [userRole]);

  // Handle form submission for email/password login
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully!");
        handleRedirect();
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Failed to log in. Please try again.");
      });
  };
  const handleGoogleAuth = () => {
    try {
      window.location.href = `${server}/auth/google/callback`;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${server}/auth/login/success`, {
        withCredentials: true,
      });
      console.log("User Data:", res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className=" h-[600px]  text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-5">
          <div className=" flex flex-col items-center">
            <h1 className="text-2xl xl:text-2xl font-extrabold">Sign in</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  onClick={handleGoogleAuth}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-50"
                >
                  <svg class="w-4" viewBox="0 0 533.5 544.3">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                  <span class="ml-4">Continue with Google</span>
                </button>
              </div>
              <div className="my-5 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Login in with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit} className="w-full max-w-xs">
                  <input
                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loginStatus === STATUSES.LOADING}
                  >
                    {loginStatus === STATUSES.LOADING ? (
                      <svg
                        className="w-6 h-6 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.411 2.818 8.166 6.832 9.623l.168-4.332z"
                        ></path>
                      </svg>
                    ) : (
                      <span className="ml-3">Sign In</span>
                    )}
                  </button>
                  {loginStatus === STATUSES.ERROR && (
                    <p className="text-red-500 mt-2">
                      Failed to log in. Please try again.
                    </p>
                  )}
                  <div className=" border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or
                    </div>
                  </div>

                  <Link
                    to={"/register"}
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Register</span>
                  </Link>
                </form>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by templatana's
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    {" "}
                    Terms of Service{" "}
                  </a>
                  and its
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-1  text-center hidden lg:flex bg-contain  bg-no-repeat h-[638px] "
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D")',
          }}
        >
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
