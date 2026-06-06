import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoChevronDown, IoChevronUp, IoCheckmarkCircle } from "react-icons/io5";
import AktuNavbar from "../components/AktuNavbar";
import AktuFooter from "../components/AktuFooter";
import { interviewQuestions } from "../data/interviewData";

export default function InterviewPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Category
  const [activeTab, setActiveTab] = useState("java");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Sync with search queries
  useEffect(() => {
    const topicParam = searchParams.get("topic");
    if (topicParam && interviewQuestions[topicParam]) {
      setActiveTab(topicParam);
    }
  }, [searchParams]);

  const handleTabChange = (key) => {
    setSearchParams({ topic: key });
    setExpandedIndex(null);
  };

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filter questions by search input
  const filteredQuestions = interviewQuestions[activeTab]?.questions.filter(
    (q) =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 flex flex-col justify-between selection:bg-purple-500/30">
      <AktuNavbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
            Interview Prep
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 text-purple-400">
            Interview Cheat Sheets & QA
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Curated list of technical and non-technical interview questions asked in placements.
          </p>
        </header>

        {/* Search Bar & Tabs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Subject Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 bg-white/5 border border-white/10 p-5 rounded-2xl">
            {/* Search within this topic */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search QA in this topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-purple-500 focus:bg-white/10"
              />
              <IoSearch className="absolute left-3 top-3 text-gray-500 text-sm" />
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
              Select Category
            </h3>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
              {Object.keys(interviewQuestions).map((key) => (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all font-bold ${
                    activeTab === key
                      ? "bg-purple-600/15 border-purple-500/50 text-white"
                      : "bg-transparent border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {interviewQuestions[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Q&A Accordion Panel */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h2 className="text-2xl font-extrabold text-white">
                {interviewQuestions[activeTab]?.title}
              </h2>
              <span className="text-xs text-gray-500 font-semibold">
                {filteredQuestions.length} Questions
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((qa, index) => {
                  const isExpanded = expandedIndex === index;
                  return (
                    <div
                      key={index}
                      className="border border-white/5 bg-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all"
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-gray-200 hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-3 pr-4">
                          <IoCheckmarkCircle className="text-purple-400 shrink-0 text-lg sm:text-xl" />
                          <span>{qa.q}</span>
                        </div>
                        {isExpanded ? <IoChevronUp className="text-purple-400 shrink-0" /> : <IoChevronDown className="text-gray-500 shrink-0" />}
                      </button>

                      {/* Accordion Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-950/40 border-t border-white/5"
                          >
                            <p className="p-5 text-sm sm:text-base text-gray-400 leading-relaxed font-normal whitespace-pre-line">
                              {qa.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-20 text-gray-500 bg-white/5 border border-white/5 rounded-2xl">
                  No questions match your search query in this topic.
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <AktuFooter />
    </div>
  );
}
