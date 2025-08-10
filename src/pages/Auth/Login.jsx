import Lottie from "lottie-react";
import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import loginAnimation from "../../assets/lottieAnimation/loginAnimation.json";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin";
import { motion } from "framer-motion";

const Login = () => {
  const { userSignIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userSignIn(email, password)
      .then((result) => {
        if (result.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sign-in Successful!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`${location.state ? location.state : "/"}`);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage || errorCode,
        });
      });
  };

  return (
    <motion.div
      className="px-4 py-8 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="min-h-screen flex flex-col-reverse lg:flex-row-reverse items-center justify-center bg-base-200 gap-6">
        {/* Lottie Animation */}
        <div className="w-full max-w-xl mx-auto flex justify-center">
          <Lottie
            animationData={loginAnimation}
            loop
            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto bg-base-100 shadow-2xl rounded-xl p-6 mt-[5%]">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Login now!</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
                required
              />
            </div>
            <button className="btn bg-blue-500 hover:bg-blue-600 w-full mt-2">
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link
              to="/auth/register"
              className="link link-hover ml-1 text-blue-600 font-medium"
            >
              Register
            </Link>
          </div>

          <div className="divider">or</div>

          <SocialLogin />
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
