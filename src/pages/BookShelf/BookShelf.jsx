import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Make sure this is correctly linked
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { motion } from "framer-motion";

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch books on mount
  useEffect(() => {
    fetch("https://virtual-bookshelf-server-weld.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setDisplayBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  // Filter logic (category + status + search)
  useEffect(() => {
    let filtered = books;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (book) => book.book_category === selectedCategory
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (book) => book.reading_status === selectedStatus
      );
    }

    // Search by title or author
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.book_title.toLowerCase().includes(lowerSearch) ||
          book.book_author.toLowerCase().includes(lowerSearch)
      );
    }

    setDisplayBooks(filtered);
  }, [selectedCategory, selectedStatus, searchTerm, books]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-semibold animate-pulse">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 bookshelf-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Public Book Listing
        </h2>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex gap-2">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border px-4 py-2 rounded-md"
            >
              <option value="All">All Categories</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Fantasy">Fantasy</option>
            </select>

            {/* Reading Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border px-4 py-2 rounded-md"
            >
              <option value="All">All Status</option>
              <option value="Read">Read</option>
              <option value="Reading">Reading</option>
              <option value="Want-to-Read">Want-to-Read</option>
            </select>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md w-full md:w-1/3"
          />
        </div>

        {/* Book Grid */}
        {displayBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayBooks.map((book) => (
              <div
                key={book._id}
                className="border rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={book.cover_photo}
                  alt={book.book_title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">
                  {book.book_title}
                </h3>
                <p className="text-gray-600 mb-1">Author: {book.book_author}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Category: {book.book_category}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Status: {book.reading_status}
                </p>
                <p className="text-sm font-medium text-green-600 mb-3">
                  Upvotes: {book.upvote}
                </p>

                <Link to={`/books/${book._id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No books found.</div>
        )}
      </div>
    </motion.div>
  );
};

export default BookShelf;
