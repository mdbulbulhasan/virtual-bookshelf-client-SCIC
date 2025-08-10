import React from "react";
import Lottie from "lottie-react";
import { motion } from "motion/react"; // motion library
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import aboutAnimation from "../../assets/lottieAnimation/aboutus.json";

const AboutUs = () => {
    const team = [
        {
            name: "Md Bulbul Hasan",
            role: "Founder & Developer",
            img: "https://i.ibb.co.com/sDJ5Xhx/Md-Bulbul-Hasan.jpg",
            fb: "https://www.facebook.com/mdbulbulhasan09/",
            li: "https://www.linkedin.com/in/mdbulbulhasan/",
            gh: "https://github.com/mdbulbulhasan",
        },
        {
            name: "Md Bulbul Hasan",
            role: "UI/UX Designer",
            img: "https://i.ibb.co.com/sDJ5Xhx/Md-Bulbul-Hasan.jpg",
            fb: "https://www.facebook.com/mdbulbulhasan09/",
            li: "https://www.linkedin.com/in/mdbulbulhasan/",
            gh: "https://github.com/mdbulbulhasan",
        },
        {
            name: "Md Bulbul Hasan",
            role: "Backend Engineer",
            img: "https://i.ibb.co.com/sDJ5Xhx/Md-Bulbul-Hasan.jpg",
            fb: "https://www.facebook.com/mdbulbulhasan09/",
            li: "https://www.linkedin.com/in/mdbulbulhasan/",
            gh: "https://github.com/mdbulbulhasan",
        },
    ];

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Hero Section */}
            <motion.section
                className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        About{" "}
                        <span className="text-black">
              Book<span className="text-yellow-500">SHELF</span>
            </span>
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Book<span className="text-yellow-500">SHELF</span> is a modern platform for book lovers to
                        discover, share, and organize their favorite reads. We believe in the power of stories and aim to
                        connect people through literature.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Whether you're exploring a new genre or revisiting a beloved classic, our mission is to make your
                        reading journey more inspiring and connected.
                    </p>
                </div>
                <motion.div
                    className="flex-1"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Lottie animationData={aboutAnimation} loop={true} />
                </motion.div>
            </motion.section>

            {/* Mission & Vision */}
            <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
                {[
                    {
                        title: "Our Mission",
                        text: "To create a global community where readers can connect, share recommendations, and celebrate the joy of reading through a seamless, interactive platform.",
                    },
                    {
                        title: "Our Vision",
                        text: "To be the most trusted and engaging online destination for book lovers, fostering a lifelong love for reading and knowledge sharing.",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition"
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-semibold text-black mb-4">{item.title}</h2>
                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </motion.div>
                ))}
            </section>

            {/* Team Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 text-center">
                <motion.h2
                    className="text-3xl font-bold text-gray-800 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Meet Our Team
                </motion.h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: idx * 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
                            />
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-yellow-500">{member.role}</p>
                            <div className="flex gap-4 mt-4 text-gray-500">
                                <a href={member.fb} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                                    <FaFacebook size={20} />
                                </a>
                                <a href={member.li} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href={member.gh} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                                    <FaGithub size={20} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer Quote */}
            <motion.section
                className="max-w-6xl mx-auto py-12 mt-16 shadow-2xl rounded-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <p className="text-center text-black text-xl max-w-3xl mx-auto px-4">
                    “A reader lives a thousand lives before he dies. The man who never reads lives only one.” – George
                    R.R. Martin
                </p>
            </motion.section>
        </motion.div>
    );
};

export default AboutUs;
