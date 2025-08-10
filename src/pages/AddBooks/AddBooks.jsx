import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { motion } from "framer-motion";

const AddBooks = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formdata = new FormData(form);
    const newBook = Object.fromEntries(formdata.entries());

    fetch("https://virtual-bookshelf-server-weld.vercel.app/books", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Book added successfully!",
            confirmButtonColor: "#2563eb", // Tailwind blue-600
          });
          navigate("/mybooks"); // or navigate("/") if you want
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to add book.",
            confirmButtonColor: "#ef4444", // Tailwind red-500
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
        console.error("Add book error:", error);
      });
  };
  if (!user) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-12 text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold">Add New Book</h1>
      </div>
      {/* rest of your JSX */}
      <div className="p-6">
        <form onSubmit={handleAddBook}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Book Title */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Book Title</label>
              <input
                type="text"
                name="book_title"
                className="input w-full"
                placeholder="Book Title"
                required
                disabled={loading}
              />
            </fieldset>

            {/* Cover Photo URL */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Cover Photo URL</label>
              <input
                type="text"
                name="cover_photo"
                className="input w-full"
                placeholder="Cover Photo URL"
                required
                disabled={loading}
              />
            </fieldset>

            {/* Total Page */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Total Page</label>
              <input
                type="number"
                name="total_page"
                className="input w-full"
                placeholder="Total Page"
                required
                disabled={loading}
              />
            </fieldset>

            {/* Book Author */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Book Author</label>
              <input
                type="text"
                name="book_author"
                className="input w-full"
                placeholder="Author Name"
                required
                disabled={loading}
              />
            </fieldset>

            {/* User Email (Read Only) */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Your Email</label>
              <input
                type="email"
                name="user_email"
                value={user?.email || ""}
                readOnly
                className="input w-full"
              />
            </fieldset>

            {/* User Name (Read Only) */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Your Name</label>
              <input
                type="text"
                name="user_name"
                value={user?.displayName || ""}
                readOnly
                className="input w-full"
              />
            </fieldset>

            {/* Book Category */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Book Category</label>
              <select
                name="book_category"
                className="select w-full"
                required
                disabled={loading}
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Fantasy">Fantasy</option>
              </select>
            </fieldset>

            {/* Reading Status */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Reading Status</label>
              <select
                name="reading_status"
                className="select w-full"
                required
                disabled={loading}
              >
                <option value="">Select Status</option>
                <option value="Read">Read</option>
                <option value="Reading">Reading</option>
                <option value="Want-to-Read">Want-to-Read</option>
              </select>
            </fieldset>

            {/* Upvote (Read Only) */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
              <label className="label">Upvote</label>
              <input
                type="number"
                name="upvote"
                value="0"
                readOnly
                className="input w-full"
              />
            </fieldset>

            {/* Book Overview */}
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 md:col-span-3">
              <label className="label">Book Overview</label>
              <textarea
                name="book_overview"
                className="textarea w-full"
                placeholder="Book Overview"
                rows="4"
                required
                disabled={loading}
              ></textarea>
            </fieldset>
          </div>

          {/* Submit Button */}
          <input
            className="btn bg-blue-500 hover:bg-blue-600 w-full my-6"
            type="submit"
            value={loading ? <LoadingSpinner></LoadingSpinner> : "Add New Book"}
            disabled={loading}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default AddBooks;
