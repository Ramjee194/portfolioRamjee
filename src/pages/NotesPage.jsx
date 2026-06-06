import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoDownload, IoLayers, IoBook, IoReader, IoList, IoCode, IoHelpCircle } from "react-icons/io5";
import AktuNavbar from "../components/AktuNavbar";
import AktuFooter from "../components/AktuFooter";
import { btechNotes, bcaNotes, bpharmNotes, getSubjectResources } from "../data/aktuNotesData";

export default function NotesPage() {
  const { course } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Load correct notes data matching parameters
  const notesData = course === "bca" ? bcaNotes : course === "bpharm" ? bpharmNotes : btechNotes;
  const courseLabel = course === "bca" ? "BCA" : course === "bpharm" ? "B.Pharm" : "B.Tech";
  const semestersCount = course === "bca" ? 6 : 8;

  // Selected state
  const [activeSem, setActiveSem] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectDetails, setSubjectDetails] = useState(null);

  // Synchronize tabs with search parameters (for search/navbar redirection support)
  useEffect(() => {
    const semParam = searchParams.get("sem");
    const subjectParam = searchParams.get("subject");

    if (semParam) {
      const semNum = parseInt(semParam);
      if (semNum >= 1 && semNum <= semestersCount) {
        setActiveSem(semNum);
        
        // Find subject matching name in this semester
        if (subjectParam && notesData[semNum]) {
          const matched = notesData[semNum].find(s => s.name === subjectParam);
          if (matched) {
            setSelectedSubject(matched);
            setSubjectDetails(getSubjectResources(matched.name, matched.code));
            return;
          }
        }
      }
    }

    // Default: Reset to first subject of active sem
    if (notesData[activeSem] && notesData[activeSem].length > 0) {
      const firstSub = notesData[activeSem][0];
      setSelectedSubject(firstSub);
      setSubjectDetails(getSubjectResources(firstSub.name, firstSub.code));
    }
  }, [course, searchParams]);

  const handleSemChange = (semNum) => {
    setSearchParams({ sem: semNum });
  };

  const handleSubjectChange = (sub) => {
    setSearchParams({ sem: activeSem, subject: sub.name });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 flex flex-col justify-between selection:bg-purple-500/30">
      <AktuNavbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Page Header */}
        <header className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
            {courseLabel} Notes
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 text-purple-400">
            Semester-wise Study Material
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Select your semester and subject to preview syllabus and download unit notes.
          </p>
        </header>

        {/* Semester Tab List */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
          {Array.from({ length: semestersCount }, (_, i) => i + 1).map((semNum) => (
            <button
              key={semNum}
              onClick={() => handleSemChange(semNum)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeSem === semNum
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              Semester {semNum}
            </button>
          ))}
        </div>

        {/* Notes Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Subject Selector Column */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
              Semester {activeSem} Subjects
            </h3>
            {notesData[activeSem]?.map((sub) => (
              <button
                key={sub.code}
                onClick={() => handleSubjectChange(sub)}
                className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex flex-col gap-1.5 ${
                  selectedSubject?.code === sub.code
                    ? "bg-purple-600/15 border-purple-500/50 text-white"
                    : "bg-transparent border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                }`}
              >
                <span className="font-bold">{sub.name}</span>
                <span className="text-xs font-mono opacity-60">{sub.code}</span>
              </button>
            ))}
          </div>

          {/* Right Side: Selected Subject Details Viewer */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {selectedSubject && subjectDetails ? (
              <motion.div
                key={selectedSubject.code}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                
                {/* Header overview Card */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-mono text-purple-400 font-bold">{selectedSubject.code}</span>
                  <h2 className="text-2xl font-extrabold text-white mt-1 mb-3">{selectedSubject.name}</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">{subjectDetails.overview}</p>
                </div>

                {/* Sub-sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Notes Card */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <IoReader className="text-purple-400" />
                      <span>Unit-wise Notes</span>
                    </h3>
                    <div className="flex flex-col gap-2">
                      {subjectDetails.notes.map((n) => (
                        <a
                          key={n.unit}
                          href={n.path}
                          download
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-purple-600 text-sm font-semibold transition-all group"
                        >
                          <span className="group-hover:text-white text-gray-300">{n.title}</span>
                          <IoDownload className="text-purple-400 group-hover:text-white shrink-0 ml-2" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* PYQs & Lab Files Card */}
                  <div className="flex flex-col gap-6">
                    
                    {/* Previous Year Papers */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                        <IoBook className="text-pink-400" />
                        <span>Previous Year Papers</span>
                      </h3>
                      <div className="flex flex-col gap-2">
                        {subjectDetails.pyqs.map((p, idx) => (
                          <a
                            key={idx}
                            href={p.path}
                            download
                            className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-pink-600 text-sm font-semibold transition-all group"
                          >
                            <div className="flex flex-col">
                              <span className="text-gray-300 group-hover:text-white">{p.year}</span>
                              <span className="text-[10px] text-gray-500 group-hover:text-white/80">{p.exam}</span>
                            </div>
                            <IoDownload className="text-pink-400 group-hover:text-white shrink-0 ml-2" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Lab Files */}
                    {subjectDetails.labFiles.length > 0 && (
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                          <IoCode className="text-blue-400" />
                          <span>Lab Files & Manuals</span>
                        </h3>
                        <div className="flex flex-col gap-2">
                          {subjectDetails.labFiles.map((l, idx) => (
                            <a
                              key={idx}
                              href={l.path}
                              download
                              className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-blue-600 text-sm font-semibold transition-all group"
                            >
                              <span className="text-gray-300 group-hover:text-white">{l.name}</span>
                              <IoDownload className="text-blue-400 group-hover:text-white shrink-0 ml-2" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Important Questions Card */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 md:col-span-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <IoList className="text-yellow-400" />
                      <span>Important Questions</span>
                    </h3>
                    <div className="flex flex-col gap-4">
                      {subjectDetails.importantQuestions.map((q, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                          <span className="text-sm font-bold text-white">Q{idx + 1}: {q.q}</span>
                          <span className="text-xs text-gray-400">Ans: {q.a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Viva Questions Card */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 md:col-span-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <IoHelpCircle className="text-green-400" />
                      <span>Viva Questions & Answers</span>
                    </h3>
                    <div className="flex flex-col gap-4">
                      {subjectDetails.viva.map((v, idx) => (
                        <div key={idx} className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                          <span className="text-sm font-bold text-white">Q{idx + 1}: {v.q}</span>
                          <span className="text-xs text-gray-400">Ans: {v.a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Syllabus Card */}
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4 md:col-span-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2.5">
                      <IoBook className="text-purple-400" />
                      <span>AKTU Syllabus Details</span>
                    </h3>
                    <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line bg-gray-950/40 p-4 rounded-xl border border-white/5">
                      {subjectDetails.syllabus}
                    </div>
                  </div>

                </div>

              </motion.div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                Please select a subject to load resources.
              </div>
            )}
          </div>

        </div>
      </main>

      <AktuFooter />
    </div>
  );
}
