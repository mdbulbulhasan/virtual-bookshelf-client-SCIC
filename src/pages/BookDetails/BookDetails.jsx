import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const BookDetails = () => {
  const book = useLoaderData();
  const { user } = useContext(AuthContext);

  const [upvoteCount, setUpvoteCount] = useState(book.upvote); // string
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [readingStatus, setReadingStatus] = useState(book.reading_status);

  // Fetch reviews
  useEffect(() => {
    fetch(
      `https://virtual-bookshelf-server-weld.vercel.app/reviews/${book._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        if (user) {
          const found = data.find((r) => r.user_email === user.email);
          if (found) setUserReview(found);
        }
        setLoading(false);
      });
  }, [book._id, user]);

  // Handle Reading Status
  const handleReadingStatusChange = (newStatus) => {
    fetch(
      `https://virtual-bookshelf-server-weld.vercel.app/books/${book._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: user.email,
          updateData: { reading_status: newStatus },
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        setReadingStatus(newStatus);
        Swal.fire("Success", `Status updated to "${newStatus}"`, "success");
      })
      .catch(() =>
        Swal.fire("Error", "Could not update reading status", "error")
      );
  };

  // Handle Upvote
  const handleUpvote = () => {
    if (user?.email === book.user_email) {
      Swal.fire("Warning", "You cannot upvote your own book", "warning");
      return;
    }

    fetch(
      `https://virtual-bookshelf-server-weld.vercel.app/books/upvote/${book._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email: user?.email }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUpvoteCount(data.newUpvote); // from server
          Swal.fire("Success", "Upvoted successfully", "success");
        } else {
          Swal.fire("Note", data.message || "Could not upvote", "info");
        }
      })
      .catch(() => Swal.fire("Error", "Could not upvote", "error"));
  };

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const content = e.target.elements.review.value;

    fetch("https://virtual-bookshelf-server-weld.vercel.app/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: book._id,
        user_name: user.displayName,
        user_email: user.email,
        content,
      }),
    })
      .then((res) => {
        if (res.status === 409) throw new Error("Already reviewed");
        return res.json();
      })
      .then((data) => {
        Swal.fire("Success", "Review added", "success");
        const newReview = {
          _id: data.insertedId,
          content,
          user_name: user.displayName,
          user_email: user.email,
        };
        setUserReview(newReview);
        setReviews([...reviews, newReview]);
        e.target.reset();
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  // Handle Review Edit Submit
  const handleEditSubmit = (e, id) => {
    e.preventDefault();

    fetch(`https://virtual-bookshelf-server-weld.vercel.app/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: user.email,
        content: editContent,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success", "Review updated", "success");
        const updatedReviews = reviews.map((r) =>
          r._id === id ? { ...r, content: editContent } : r
        );
        setReviews(updatedReviews);
        setUserReview({ ...userReview, content: editContent });
        setIsEditing(false);
        setEditContent("");
      })
      .catch(() => Swal.fire("Error", "Could not update review", "error"));
  };

  // Handle Review Delete
  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://virtual-bookshelf-server-weld.vercel.app/reviews/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_email: user.email }),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
            const filtered = reviews.filter((r) => r._id !== id);
            setReviews(filtered);
            setUserReview(null);
          })
          .catch(() =>
            Swal.fire("Error", "Something went wrong deleting review", "error")
          );
      }
    });
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* rest of your JSX */}
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{book.book_title}</h2>
        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-full max-w-md rounded-md my-4"
        />
        <p>
          <strong>Author:</strong> {book.book_author}
        </p>
        <p>
          <strong>Total Pages:</strong> {book.total_page}
        </p>
        <p>
          <strong>Category:</strong> {book.book_category}
        </p>

        {user?.email === book.user_email && (
          <div className="mt-4">
            <label className="block font-semibold mb-1">Reading Status:</label>
            <select
              value={readingStatus}
              onChange={(e) => handleReadingStatusChange(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="Want-to-Read">Want-to-Read</option>
              <option value="Reading">Reading</option>
              <option value="Read">Read</option>
            </select>
          </div>
        )}

        <p>
          <strong>Overview:</strong> {book.book_overview}
        </p>
        <p className="mt-2">
          <strong>Added By:</strong> {book.user_name} ({book.user_email})
        </p>

        <p className="mt-4 font-semibold text-green-700">
          Upvotes: {upvoteCount}
        </p>

        {user && user.email !== book.user_email && (
          <button
            onClick={handleUpvote}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 rounded-md transition cursor-pointer"
          >
            Upvote
          </button>
        )}

        <hr className="my-6" />

        {/* Reviews */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Reviews</h3>

          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            <>
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="border p-3 rounded mb-2">
                    <p className="font-bold">{review.user_name}</p>

                    {isEditing && userReview?._id === review._id ? (
                      <form onSubmit={(e) => handleEditSubmit(e, review._id)}>
                        <textarea
                          className="border p-2 w-full text-red-500"
                          rows="3"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        ></textarea>
                        <div className="flex gap-2 mt-2">
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-3 py-1 rounded transition cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="bg-gray-400 text-white px-3 py-1 rounded transition cursor-pointer"
                            onClick={() => {
                              setIsEditing(false);
                              setEditContent("");
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p>{review.content}</p>
                    )}

                    {user?.email === review.user_email && !isEditing && (
                      <div className="flex gap-4 mt-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-md hover:bg-blue-700 transition cursor-pointer text-sm"
                          onClick={() => {
                            setIsEditing(true);
                            setEditContent(review.content);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white bg-red-600 px-4 py-2 mt-3 rounded-md hover:bg-red-800 transition cursor-pointer text-sm"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}

              {user && !userReview && (
                <form onSubmit={handleReviewSubmit} className="mt-4">
                  <textarea
                    name="review"
                    rows="3"
                    className="border p-2 w-full"
                    placeholder="Write your review..."
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md mt-2 cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {userReview && !isEditing && (
                <div className="mt-4 text-yellow-700">
                  You already reviewed this book.
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default BookDetails;
