import React from "react";
import Lottie from "lottie-react";
import {FaFacebook, FaLinkedin, FaGithub} from "react-icons/fa";
import aboutAnimation from "../../assets/lottieAnimation/aboutus.json";

const AboutUs = () => {
    const team = [
        {
            name: "Md Bulbul Hasan",
            role: "Founder & Developer",
            img: "https://i.ibb.co.com/sDJ5Xhx/Md-Bulbul-Hasan.jpg",
            fb: "#",
            li: "#",
            gh: "#",
        },
        {
            name: "Md Bulbul Hasan",
            role: "UI/UX Designer",
            img: "https://i.ibb.co.com/sDJ5Xhx/Md-Bulbul-Hasan.jpg",
            fb: "#",
            li: "#",
            gh: "#",
        },
        {
            name: "Md Bulbul Hasan",
            role: "Backend Engineer",
            img: "https://i.ibb.co.com/sDJ5Xhx/Md-Bulbul-Hasan.jpg",
            fb: "#",
            li: "#",
            gh: "#",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
            {/* Hero Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                        About <span className="text-black">
            Book<span className="text-yellow-500">SHELF</span>
          </span>
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Book<span className="text-yellow-500">SHELF</span> is a modern platform for book lovers to discover, share, and
                        organize their favorite reads. We believe in the power of stories and aim to
                        connect people through literature.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Whether you're exploring a new genre or revisiting a beloved classic, our mission
                        is to make your reading journey more inspiring and connected.
                    </p>
                </div>
                <div className="flex-1">
                    <Lottie animationData={aboutAnimation} loop={true}/>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To create a global community where readers can connect, share recommendations,
                        and celebrate the joy of reading through a seamless, interactive platform.
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                    <h2 className="text-2xl font-semibold text-black mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To be the most trusted and engaging online destination for book lovers, fostering
                        a lifelong love for reading and knowledge sharing.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="max-w-6xl mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-12">Meet Our Team</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
                            />
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-yellow-500">{member.role}</p>
                            <div className="flex gap-4 mt-4 text-gray-500">
                                <a href={member.fb} className="hover:text-yellow-500">
                                    <FaFacebook size={20}/>
                                </a>
                                <a href={member.li} className="hover:text-yellow-500">
                                    <FaLinkedin size={20}/>
                                </a>
                                <a href={member.gh} className="hover:text-yellow-500">
                                    <FaGithub size={20}/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Quote */}
            <section className="max-w-6xl mx-auto py-12 mt-16 shadow-2xl rounded-2xl">
                <p className="text-center text-black text-xl max-w-3xl mx-auto px-4">
                    “A reader lives a thousand lives before he dies. The man who never reads lives only
                    one.” – George R.R. Martin
                </p>
            </section>
        </div>
    );
};

export default AboutUs;
