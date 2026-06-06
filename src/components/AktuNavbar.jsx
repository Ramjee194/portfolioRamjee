import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu, IoClose, IoSearch, IoSparkles, IoChevronDown } from "react-icons/io5";
import { btechNotes, bcaNotes, bpharmNotes } from "../data/aktuNotesData";
import { placementData } from "../data/placementData";
import { interviewQuestions } from "../data/interviewData";

export default function AktuNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle live search matching
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const matches = [];
    const qLower = query.toLowerCase();

    // 1. Search B.Tech, BCA, B.Pharm Notes
    const searchInNotes = (notesObj, courseType) => {
      Object.keys(notesObj).forEach((sem) => {
        notesObj[sem].forEach((sub) => {
          if (sub.name.toLowerCase().includes(qLower) || sub.code.toLowerCase().includes(qLower)) {
            matches.push({
              title: `${sub.name} (${courseType} - Sem ${sem})`,
              url: `/notes/${courseType}?sem=${sem}&subject=${encodeURIComponent(sub.name)}`,
              type: "Notes"
            });
          }
        });
      });
    };

    searchInNotes(btechNotes, "btech");
    searchInNotes(bcaNotes, "bca");
    searchInNotes(bpharmNotes, "bpharm");

    // 2. Search Placement Prep
    Object.keys(placementData).forEach((categoryKey) => {
      const cat = placementData[categoryKey];
      cat.topics.forEach((topic) => {
        if (topic.name.toLowerCase().includes(qLower)) {
          matches.push({
            title: `${topic.name} (Placement Prep)`,
            url: `/placement?category=${categoryKey}&topic=${encodeURIComponent(topic.name)}`,
            type: "Placement"
          });
        }
      });
    });

    // 3. Search Interview Prep
    Object.keys(interviewQuestions).forEach((key) => {
      const cat = interviewQuestions[key];
      if (cat.title.toLowerCase().includes(qLower)) {
        matches.push({
          title: cat.title,
          url: `/interview?topic=${key}`,
          type: "Interview"
        });
      }
    });

    setSearchResults(matches.slice(0, 8)); // Cap results at 8
  };

  const handleResultClick = (url) => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchFocused(false);
    setMenuOpen(false);
    navigate(url);
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <IoSparkles className="text-purple-500 text-2xl animate-pulse" />
          <span className="font-extrabold text-lg sm:text-xl text-purple-400 tracking-tight">
            AKTU HUB
          </span>
        </Link>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subjects, notes, placement, QA..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-10 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <IoSearch className="absolute left-3.5 top-2.5 text-gray-400 text-base" />
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div className="absolute top-11 left-0 w-full bg-gray-900/95 border border-white/15 rounded-xl overflow-hidden backdrop-blur-md">
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map((res, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(res.url)}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-white/5 text-gray-300 hover:text-white border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{res.title}</span>
                    <span className="text-[10px] uppercase font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 shrink-0 ml-2">
                      {res.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors">Home</Link>
          
          {/* Consolidated Notes Dropdown */}
          <div className="relative group">
            <button className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors flex items-center gap-1.5 focus:outline-none py-2 cursor-pointer">
              <span>Notes</span>
              <IoChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-9 left-0 w-48 bg-gray-900 border border-white/10 rounded-xl overflow-hidden hidden group-hover:block backdrop-blur-md">
              <Link to="/notes/btech" className="block px-4 py-2.5 text-sm hover:bg-white/5 text-gray-300 hover:text-white transition-all">B.Tech Notes</Link>
              <Link to="/notes/bca" className="block px-4 py-2.5 text-sm hover:bg-white/5 text-gray-300 hover:text-white transition-all">BCA Notes</Link>
              <Link to="/notes/bpharm" className="block px-4 py-2.5 text-sm hover:bg-white/5 text-gray-300 hover:text-white transition-all">B.Pharm Notes</Link>
            </div>
          </div>

          <Link to="/placement" className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors">Placement Prep</Link>
          <Link to="/gate" className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors">GATE Prep</Link>
          <Link to="/interview" className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors">Interview Notes</Link>
          <Link to="/portfolio" className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors">My Portfolio</Link>
          <Link to="/contact" className="text-gray-300 hover:text-purple-400 text-sm font-semibold transition-colors">Contact</Link>
          
          <a
            href="https://orbous.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full border border-purple-500 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all shrink-0"
          >
            Founder
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            {menuOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="xl:hidden bg-gray-950 border-b border-white/10 px-4 py-6 flex flex-col gap-4">
          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 text-sm focus:outline-none"
            />
            <IoSearch className="absolute left-3 top-3 text-gray-400" />
            {searchResults.length > 0 && (
              <div className="absolute top-11 left-0 w-full bg-gray-900 border border-white/10 rounded-lg z-50 overflow-hidden">
                {searchResults.map((res, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(res.url)}
                    className="w-full text-left px-4 py-3 text-xs hover:bg-white/5 text-gray-300 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{res.title}</span>
                    <span className="text-[9px] uppercase font-bold text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/10">
                      {res.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-3 font-semibold text-gray-300 text-base">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all">Home</Link>
            
            {/* Notes Group */}
            <div className="flex flex-col">
              <span className="p-2 text-gray-500 text-xs font-bold uppercase tracking-wider">Notes</span>
              <div className="flex flex-col pl-4 gap-1.5 mt-1 border-l border-white/10">
                <Link to="/notes/btech" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-1.5 text-sm rounded hover:bg-white/5 transition-all">B.Tech Notes</Link>
                <Link to="/notes/bca" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-1.5 text-sm rounded hover:bg-white/5 transition-all">BCA Notes</Link>
                <Link to="/notes/bpharm" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-1.5 text-sm rounded hover:bg-white/5 transition-all">B.Pharm Notes</Link>
              </div>
            </div>

            <Link to="/placement" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all">Placement Prep</Link>
            <Link to="/gate" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all">GATE Prep</Link>
            <Link to="/interview" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all">Interview Notes</Link>
            <Link to="/portfolio" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all">My Portfolio</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-purple-400 p-2 rounded hover:bg-white/5 transition-all">Contact</Link>
            
            <a
              href="https://orbous.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all"
            >
              Founder (orbous.com)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
