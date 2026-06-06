import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoDownload, IoLayers, IoBook, IoReader, IoList, IoCode, IoHelpCircle } from "react-icons/io5";
import AktuNavbar from "../components/AktuNavbar";
import AktuFooter from "../components/AktuFooter";
import { placementData } from "../data/placementData";

export default function PlacementPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active states
  const [activeCategory, setActiveCategory] = useState("programming");
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Sync state with search params (for search results navigation)
  useEffect(() => {
    const catParam = searchParams.get("category");
    const topicParam = searchParams.get("topic");

    if (catParam && placementData[catParam]) {
      setActiveCategory(catParam);
      
      if (topicParam) {
        const matched = placementData[catParam].topics.find(t => t.name === topicParam);
        if (matched) {
          setSelectedTopic(matched);
          return;
        }
      }
    }

    // Default: first topic of active category
    if (placementData[activeCategory]?.topics.length > 0) {
      setSelectedTopic(placementData[activeCategory].topics[0]);
    }
  }, [searchParams, activeCategory]);

  const handleCategoryChange = (key) => {
    setSearchParams({ category: key });
  };

  const handleTopicChange = (topic) => {
    setSearchParams({ category: activeCategory, topic: topic.name });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 flex flex-col justify-between selection:bg-purple-500/30">
      <AktuNavbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
            Placement Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 text-purple-400">
            Placement & Career Preparation
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Structured guides for coding rounds, CS core subjects, full-stack web development, and aptitude tests.
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-white/5 pb-4">
          {Object.keys(placementData).map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeCategory === key
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{placementData[key].icon}</span>
              <span>{placementData[key].title}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Topics List */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              Topic Outline
            </h3>
            {placementData[activeCategory]?.topics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => handleTopicChange(topic)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                  selectedTopic?.name === topic.name
                    ? "bg-purple-600/15 border-purple-500/50 text-white"
                    : "bg-transparent border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <span className="font-bold block">{topic.name}</span>
              </button>
            ))}
          </div>

          {/* Right Column: Details Card */}
          <div className="lg:col-span-8">
            {selectedTopic ? (
              <motion.div
                key={selectedTopic.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-5">
                  <div>
                    <h2 className="text-3xl font-extrabold text-white mb-2">{selectedTopic.name}</h2>
                    <span className="text-xs uppercase font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded">
                      {placementData[activeCategory].title}
                    </span>
                  </div>
                  
                  <p className="text-base text-gray-400 leading-relaxed">
                    {selectedTopic.desc}
                  </p>

                  <div className="p-4 rounded-xl bg-gray-950/40 border border-white/5 mt-2">
                    <h4 className="text-sm font-bold text-white mb-2">Study Guide Overview</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1.5">
                      <li>Complete interview-oriented cheat sheet.</li>
                      <li>Standard questions with clean explanations.</li>
                      <li>Code snippets and logical breakdowns.</li>
                      <li>Common pitfalls and coding bugs explained.</li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-6 border-t border-white/5">
                    <a
                      href={selectedTopic.file}
                      download
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all text-sm flex items-center gap-2"
                    >
                      <IoDownload size={18} />
                      <span>Download Study Material (PDF)</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                Please select a topic to load resources.
              </div>
            )}
          </div>

        </div>
      </main>

      <AktuFooter />
    </div>
  );
}
