import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import Animation from "../../components/Animation/Animation";
import { Link } from "react-router";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import { motion } from "framer-motion";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    fetch("https://virtual-bookshelf-server-weld.vercel.app/books")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => parseInt(b.upvote) - parseInt(a.upvote)
        );
        setBooks(sorted.slice(0, 9));
        setLoading(false); // ✅ stop loading
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false); // ✅ stop loading even on error
      });
  }, []);

  const categories = ["Fiction", "Non-Fiction", "Fantasy"];

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-12">
        {/* Banner Section */}
        <section className="-mx-6">
          <Banner />
        </section>

        {/* Popular Books */}
        <section className="px-6 popular-books">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Books</h2>

          {loading ? (
            <div className="text-center text-xl font-medium animate-pulse">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="book-card border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    src={book.cover_photo}
                    alt={book.book_title}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="book-title text-xl font-semibold">
                    {book.book_title}
                  </h3>
                  <p className="book-author text-gray-600">
                    Author: {book.book_author}
                  </p>
                  <p className="book-upvote text-sm text-gray-500">
                    Upvotes: {book.upvote}
                  </p>
                  <Link to={`/books/${book._id}`}>
                    <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                      Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Categories */}
        <section className="px-6 featured-categories">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="category-card p-6 rounded-lg shadow"
              >
                <h3 className="text-2xl font-semibold mb-2">{category}</h3>
                <p className="description">
                  Explore our curated collection of {category} books.
                </p>
                <Link to="/bookshelf">
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                    Browse {category}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Animation */}
        <section>
          <Animation />
        </section>

        {/* Extra Section 1: Testimonials */}
        <section className="testimonials-section px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            What Readers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-700 italic">
              "BookShelf has completely changed how I read. Amazing selection
              and easy access!" — Ayesha K.
            </blockquote>
            <blockquote className="border-l-4 border-green-500 pl-4 text-gray-700 italic">
              "I love how I can find books by category and popularity. The
              interface is beautiful too!" — Tanvir R.
            </blockquote>
          </div>
        </section>

        {/* Extra Section 2: Call to Action */}
        <section className="cta-section p-12 text-center rounded-lg shadow mx-6">
          <h2 className="text-3xl font-bold mb-4">
            Join the BookShelf Community
          </h2>
          <p className="mb-6">
            Start sharing your favorite reads and explore new ones from our vast
            library.
          </p>
          <Link to="/addbooks">
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded">
              Add Your Book
            </button>
          </Link>
        </section>
      </div>
    </motion.div>
  );
};

export default Home;
