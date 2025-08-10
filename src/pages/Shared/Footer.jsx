import React from "react";
import logo from "../../assets/Logo/logo.PNG";
import { Link } from "react-router";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navLinks = (
    <>
      <li>
        <Link to="/" className="link link-hover">
          Home
        </Link>
      </li>
      <li>
        <Link to="/bookshelf" className="link link-hover">
          Bookshelf
        </Link>
      </li>
      <li>
        <Link to="/addbooks" className="link link-hover">
          Add Book
        </Link>
      </li>
      <li>
        <Link to="/mybooks" className="link link-hover">
          My Books
        </Link>
      </li>
    </>
  );

  const authLinks = (
    <>
      <li>
        <Link to="/auth/login" className="link link-hover">
          Login
        </Link>
      </li>
      <li>
        <Link to="/auth/register" className="link link-hover">
          Register
        </Link>
      </li>
      <li>
        <Link to="/myprofile" className="link link-hover">
          My Profile
        </Link>
      </li>
    </>
  );

  return (
    <footer className="bg-gradient-to-r from-yellow-100 to-pink-100 border-t border-base-300 px-6 py-10 mt-16">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={logo} alt="BookShelf Logo" className="w-10 h-10" />
            <span className="font-bold text-lg">
              Book<span className="text-yellow-500">SHELF</span>
            </span>
          </Link>
          <p className="text-sm mt-2">
            Discover, review, and upvote your favorite books on BookShelf.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="footer-title">Explore</h4>
          <ul className="space-y-2 mt-2">{navLinks}</ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="footer-title">Account</h4>
          <ul className="space-y-2 mt-2">{authLinks}</ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="footer-title">Contact</h4>
          <p className="text-sm mt-2">
            Email:{" "}
            <a href="mailto:support@bookshelf.com" className="link link-hover">
              support@bookshelf.com
            </a>
            <br />
            Phone: +1 234 567 890
          </p>
          <p className="text-sm mt-3">
            <Link to="/terms" className="link link-hover underline">
              Terms & Conditions
            </Link>
          </p>
          <div className="flex gap-4 mt-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 text-xs opacity-60">
        © {new Date().getFullYear()} BookShelf — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
