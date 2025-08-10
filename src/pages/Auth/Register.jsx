import React, { use } from "react";
import registerAnimation from "../../assets/lottieAnimation/RegisterAnimation.json";
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { password, ...userProfile } = Object.fromEntries(formData.entries());
    const email = formData.get("email");
    const name = formData.get("name");
    const photo = formData.get("photo");

    const errors = [];
    if (!/[A-Z]/.test(password))
      errors.push("• At least one uppercase letter is required.");
    if (!/[a-z]/.test(password))
      errors.push("• At least one lowercase letter is required.");
    if (password.length < 6)
      errors.push("• Password must be at least 6 characters long.");
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        html: errors.join("<br>"),
        confirmButtonText: "Try Again",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => setUser({ ...user, displayName: name, photoURL: photo }))
          .catch(() => setUser(user));

        fetch("https://virtual-bookshelf-server-weld.vercel.app/users", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registration Successful!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(`${location.state ? location.state : "/"}`);
            }
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || error.code,
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
      <div className="min-h-screen flex flex-col-reverse lg:flex-row-reverse items-center justify-center bg-base-200 gap-3">
        {/* Lottie Animation */}
        <div className="w-full max-w-xl mx-auto flex justify-center">
          <Lottie
            animationData={registerAnimation}
            loop
            className="w-full max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>

        {/* Registration Form */}
        <div className="w-full max-w-md mx-auto bg-base-100 shadow-2xl rounded-xl p-6 mt-[5%]">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Register now!</h1>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                placeholder="Your name"
                required
              />
            </div>
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
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photo"
                className="input input-bordered w-full"
                placeholder="Photo URL"
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
              Register
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link
              to="/auth/login"
              className="link link-hover ml-1 text-blue-600 font-medium"
            >
              Login
            </Link>
          </div>

          <div className="divider">or</div>

          <SocialLogin />
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
