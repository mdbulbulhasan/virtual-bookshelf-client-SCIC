import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router"; // ✅ Fixed router import
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { motion } from "framer-motion";

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true); // 

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      user.getIdToken().then((token) => {
        fetch(`https://virtual-bookshelf-server-weld.vercel.app/mybooks?email=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMyBooks(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching books:", err);
            setLoading(false);
          });
      });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://virtual-bookshelf-server-weld.vercel.app/books/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_email: user.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your book has been deleted.", "success");
              setMyBooks(myBooks.filter((book) => book._id !== id));
            }
          });
      }
    });
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 min-h-screen">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">
          My Added Books
        </h2>

        {loading ? (
          <div className="text-center text-lg text-gray-600">
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : myBooks.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            No books added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBooks.map((book) => (
              <div key={book._id} className="border rounded p-4 shadow">
                <h3 className="text-xl font-bold">{book.book_title}</h3>
                <p>Category: {book.book_category}</p>
                <p>Author: {book.book_author}</p>
                <div className="mt-2 flex gap-3">
                  <Link to={`/updatebook/${book._id}`}>
                    <button className="bg-blue-500 text-white px-5 py-1 rounded btn cursor-pointer transition">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-5 py-1 rounded btn cursor-pointer transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBooks;
