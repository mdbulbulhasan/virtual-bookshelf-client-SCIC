import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";
import CategoryChart from "../../components/CategoryChart/CategoryChart";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      user.getIdToken().then((token) => {
        fetch(
          `https://virtual-bookshelf-server-weld.vercel.app/mybooks?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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

  const totalBooks = myBooks.length;
  const categoryCount = {
    Fiction: myBooks.filter((b) => b.book_category === "Fiction").length,
    "Non-Fiction": myBooks.filter((b) => b.book_category === "Non-Fiction")
      .length,
    Fantasy: myBooks.filter((b) => b.book_category === "Fantasy").length,
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* User Info */}
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 border rounded-xl shadow-md bg-base-100">
          <img
            src={user?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {user?.displayName || "No Name"}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Summary and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bookshelf Summary */}
          <div className="p-6 border rounded-xl shadow-md bg-base-100 space-y-3">
            <h3 className="text-xl font-semibold mb-1">Bookshelf Summary</h3>
            <p>
              Total Books: <span className="font-medium">{totalBooks}</span>
            </p>
            <p>
              Fiction:{" "}
              <span className="font-medium">{categoryCount.Fiction}</span>
            </p>
            <p>
              Non-Fiction:{" "}
              <span className="font-medium">
                {categoryCount["Non-Fiction"]}
              </span>
            </p>
            <p>
              Fantasy:{" "}
              <span className="font-medium">{categoryCount.Fantasy}</span>
            </p>
          </div>

          {/* Chart */}
          <div className="border rounded-xl shadow-lg bg-base-100">
            
            <CategoryChart books={myBooks} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyProfile;
