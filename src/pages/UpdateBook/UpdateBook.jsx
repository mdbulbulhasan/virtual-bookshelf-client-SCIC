import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const UpdateBook = () => {
  const book = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUpdateBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);
    const updateData = Object.fromEntries(formdata.entries());

    fetch(`https://virtual-bookshelf-server-weld.vercel.app/books/${book._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_email: user.email, updateData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Book updated successfully!", "success");
          navigate("/mybooks");
        } else {
          Swal.fire("Error", "No changes made or not authorized.", "error");
        }
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center mb-6">Update Book Info</h1>
      <form onSubmit={handleUpdateBook}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Book Title</label>
            <input
              type="text"
              name="book_title"
              defaultValue={book.book_title}
              className="input w-full"
              required
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Cover Photo URL</label>
            <input
              type="text"
              name="cover_photo"
              defaultValue={book.cover_photo}
              className="input w-full"
              required
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Total Page</label>
            <input
              type="number"
              name="total_page"
              defaultValue={book.total_page}
              className="input w-full"
              required
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Book Author</label>
            <input
              type="text"
              name="book_author"
              defaultValue={book.book_author}
              className="input w-full"
              required
            />
          </fieldset>

          {/* Read Only Fields */}
          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input w-full"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input w-full"
            />
          </fieldset>

          {/* Category */}
          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Book Category</label>
            <select
              name="book_category"
              defaultValue={book.book_category}
              className="select w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Fantasy">Fantasy</option>
            </select>
          </fieldset>

          {/* Reading Status */}
          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Reading Status</label>
            <select
              name="reading_status"
              defaultValue={book.reading_status}
              className="select w-full"
              required
            >
              <option value="">Select Status</option>
              <option value="Read">Read</option>
              <option value="Reading">Reading</option>
              <option value="Want-to-Read">Want-to-Read</option>
            </select>
          </fieldset>

          {/* Upvote (read only) */}
          <fieldset className="fieldset bg-base-200 border p-4">
            <label className="label">Upvote</label>
            <input
              type="number"
              value={book.upvote}
              readOnly
              className="input w-full"
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border p-4 md:col-span-3">
            <label className="label">Book Overview</label>
            <textarea
              name="book_overview"
              defaultValue={book.book_overview}
              className="textarea w-full"
              rows="4"
              required
            ></textarea>
          </fieldset>
        </div>

        <input className="btn btn-secondary w-full my-6" type="submit" value="Update Book" />
      </form>
    </div>
  );
};

export default UpdateBook;
