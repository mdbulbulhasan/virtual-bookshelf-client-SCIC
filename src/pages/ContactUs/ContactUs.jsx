import React, { useState } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import {
    FaFacebook,
    FaLinkedin,
    FaGithub,
    FaEnvelope,
    FaPhone,
} from "react-icons/fa";
import contactAnimation from "../../assets/lottieAnimation/contactus.json";
import Swal from "sweetalert2";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, message } = formData;

        if (!name || !email || !message) {
            Swal.fire({
                icon: "error",
                title: "Missing Fields",
                text: "Please fill out all fields before submitting.",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Email",
                text: "Please enter a valid email address.",
            });
            return;
        }

        console.log("Form Submitted:", formData);

        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "We will get back to you soon.",
            timer: 3000,
            showConfirmButton: false,
        });

        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >

            <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
                <motion.div
                    className="flex-1 space-y-6"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        Get in <span className="text-black">Touch</span>
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Have questions, suggestions, or just want to say hello?
                        We’d love to hear from you! Fill out the form or use the contact
                        details below to reach out.
                    </p>

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
                </motion.div>

                <motion.div
                    className="flex-1"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <Lottie animationData={contactAnimation} loop={true} />
                </motion.div>
            </section>


            <motion.section
                className="max-w-6xl mx-auto px-4 pb-16"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">Message</label>
                        <textarea
                            rows="5"
                            name="message"
                            placeholder="Write your message..."
                            value={formData.message}
                            onChange={handleChange}
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
            </motion.section>
        </motion.div>
    );
};

export default ContactUs;
