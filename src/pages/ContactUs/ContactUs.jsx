import React from "react";
import Lottie from "lottie-react";
import { FaFacebook, FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";
import contactAnimation from "../../assets/lottieAnimation/contactus.json";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Get in <span className="text-black">Touch</span>
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Have questions, suggestions, or just want to say hello?
                        We’d love to hear from you!
                        Fill out the form or use the contact details below to reach out.
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <p className="flex items-center gap-3 text-gray-700">
                            <FaEnvelope className="text-yellow-500" /> support@bookshelf.com
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                            <FaPhone className="text-yellow-500" /> +880 1234 567 890
                        </p>
                        <div className="flex gap-4 text-gray-500 mt-4">
                            <a
                                href="https://www.facebook.com/mdbulbulhasan09/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-yellow-500"
                            >
                                <FaFacebook size={22} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mdbulbulhasan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-yellow-500"
                            >
                                <FaLinkedin size={22} />
                            </a>
                            <a
                                href="https://github.com/mdbulbulhasan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-yellow-500"
                            >
                                <FaGithub size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Animation */}
                <div className="flex-1">
                    <Lottie animationData={contactAnimation} loop={true} />
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-4xl mx-auto px-4 pb-16">
                <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Message</label>
                        <textarea
                            rows="5"
                            placeholder="Write your message..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;
