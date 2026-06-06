import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoBook, IoCodeWorking, IoLayers, IoHelpCircle, IoBriefcase, IoDownload, IoArrowForward } from "react-icons/io5";
import AktuNavbar from "../components/AktuNavbar";
import AktuFooter from "../components/AktuFooter";

export default function AktuHome() {
  const stats = [
    { label: "B.Tech Notes", count: "450+ PDFs", icon: "💻" },
    { label: "BCA Notes", count: "280+ PDFs", icon: "⚛️" },
    { label: "B.Pharm Notes", count: "320+ PDFs", icon: "💊" },
    { label: "Previous Year Papers", count: "8 Years+", icon: "📚" },
    { label: "Interview Notes", count: "12 Topics", icon: "🤝" },
    { label: "Placement Resources", count: "100+ Guides", icon: "🚀" }
  ];

  const courses = [
    {
      id: "btech",
      title: "B.Tech Notes",
      desc: "All semesters (1-8) notes, official syllabi, unit-wise PDFs, previous year papers, and lab manuals for all major engineering branches.",
      color: "bg-purple-600",
      icon: <IoBook size={28} />
    },
    {
      id: "bca",
      title: "BCA Notes",
      desc: "Comprehensive study guides, mathematics solutions, digital electronics, web designing coding files, DBMS notes, and semester question banks.",
      color: "bg-pink-600",
      icon: <IoLayers size={28} />
    },
    {
      id: "bpharm",
      title: "B.Pharm Notes",
      desc: "Pharmaceutical chemistry, biochemistry, human anatomy, pharmaceutical analysis, pharmacognosy, and clinical pharmacy resources.",
      color: "bg-blue-600",
      icon: <IoBriefcase size={28} />
    }
  ];

  const trendingNotes = [
    { name: "Object Oriented Programming (Java)", code: "KCS-302", sem: "3rd Sem", course: "B.Tech", file: "/notes/java-interview.pdf" },
    { name: "Design and Analysis of Algorithms", code: "KCS-401", sem: "4th Sem", course: "B.Tech", file: "/notes/java-interview.pdf" },
    { name: "Database Management System", code: "BCA-205", sem: "2nd Sem", course: "BCA", file: "/notes/java-interview.pdf" },
    { name: "Human Anatomy and Physiology II", code: "BP-201T", sem: "2nd Sem", course: "B.Pharm", file: "/notes/java-interview.pdf" }
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 flex flex-col justify-between selection:bg-purple-500/30">
      <AktuNavbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-purple-950/10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 text-purple-400">
              AKTU Notes Hub
            </h1>
            <p className="text-lg sm:text-2xl text-gray-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Free Semester-Wise Notes, PYQs, Placement Preparation and Career Resources
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto sm:max-w-none">
              <Link
                to="/notes/btech"
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              >
                Explore Notes
              </Link>
              <Link
                to="/placement"
                className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              >
                Placement Preparation
              </Link>
              <Link
                to="/portfolio"
                className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              >
                My Portfolio
              </Link>
              <a
                href="https://orbous.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/40 text-purple-300 font-bold rounded-xl transition-all text-sm sm:text-base flex items-center justify-center gap-2"
              >
                Founder
              </a>
            </div>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 bg-gray-900/40 border-y border-white/5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center flex flex-col gap-2"
              >
                <span className="text-3xl">{stat.icon}</span>
                <span className="text-xl font-extrabold text-white">{stat.count}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Course Cards Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-4 text-purple-400">
            Choose Your Course
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-md mx-auto">
            Select your semester and program to view unit notes, syllabi, previous papers, and experiments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -8 }}
                className="flex flex-col justify-between p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${course.color} text-white mb-6 group-hover:scale-105 transition-all`}>
                    {course.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {course.desc}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <Link
                    to={`/notes/${course.id}`}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-purple-400 hover:text-purple-300 group-hover:underline"
                  >
                    <span>Browse Semesters</span>
                    <IoArrowForward className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trending Resources Section */}
        <section className="py-16 bg-gray-900/30 border-t border-white/5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center mb-12 text-purple-400">
              Trending Notes & Papers
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">
                        {note.course}
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">{note.sem}</span>
                    </div>
                    <h4 className="font-bold text-white text-base line-clamp-2 leading-snug group-hover:text-purple-300 transition-colors">
                      {note.name}
                    </h4>
                    <span className="text-xs font-mono text-gray-600 block mt-1">{note.code}</span>
                  </div>

                  <a
                    href={note.file}
                    download
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-purple-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <IoDownload />
                    <span>Download Notes</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AktuFooter />
    </div>
  );
}
