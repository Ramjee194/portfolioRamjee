import React, { useState } from "react";
import { IoDownload, IoBook, IoNavigate, IoGrid, IoCheckmarkCircle } from "react-icons/io5";
import AktuNavbar from "../components/AktuNavbar";
import AktuFooter from "../components/AktuFooter";
import { gateSyllabus, gateStrategy, gateResources } from "../data/gateData";

export default function GatePage() {
  const [activeTab, setActiveTab] = useState("syllabus");

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 flex flex-col justify-between selection:bg-purple-500/30">
      <AktuNavbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
            Exam Prep
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 text-purple-400">
            GATE Preparation & Strategy
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Structured syllabus, preparation timelines, reference guides, and PDF cheatsheets for CS/IT GATE aspirants.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab("syllabus")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "syllabus"
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Syllabus (CS & IT)
          </button>
          <button
            onClick={() => setActiveTab("strategy")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "strategy"
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Prep Strategy
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "resources"
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Resources
          </button>
        </div>

        {/* Tab Contents */}
        <div>
          {activeTab === "syllabus" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gateSyllabus.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3"
                >
                  <h3 className="text-lg font-bold text-purple-400 flex items-center gap-2">
                    <IoBook size={20} />
                    <span>{item.subject}</span>
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {item.topics.map((t, tIdx) => (
                      <li key={tIdx} className="text-sm text-gray-400 leading-relaxed pl-5 relative">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "strategy" && (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {gateStrategy.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4"
                >
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
                    <IoNavigate className="text-pink-400" />
                    <span>{item.phase}</span>
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {item.steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-3 text-sm text-gray-400 leading-relaxed">
                        <IoCheckmarkCircle className="text-pink-400 shrink-0 mt-0.5" size={18} />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {gateResources.map((res, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between gap-6 group text-center"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-4xl">📄</span>
                    <h4 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors leading-snug">
                      {res.title}
                    </h4>
                  </div>
                  <a
                    href={res.path}
                    download
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <IoDownload />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AktuFooter />
    </div>
  );
}
