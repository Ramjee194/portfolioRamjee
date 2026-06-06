import React from "react";
import { Link } from "react-router-dom";
import { IoSparkles } from "react-icons/io5";

export default function AktuFooter() {
  return (
    <footer className="w-full bg-gray-950 border-t border-white/10 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Info Column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <IoSparkles className="text-purple-500 text-2xl" />
            <span className="font-extrabold text-lg text-white tracking-tight">
              AKTU HUB
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-500">
            Free semester-wise notes, previous year question papers, viva guidelines, lab files, and placement resources for B.Tech, BCA, and B.Pharm students at AKTU.
          </p>
        </div>

        {/* Notes Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Course Notes</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/notes/btech" className="hover:text-purple-400 transition-colors">B.Tech Notes</Link></li>
            <li><Link to="/notes/bca" className="hover:text-purple-400 transition-colors">BCA Notes</Link></li>
            <li><Link to="/notes/bpharm" className="hover:text-purple-400 transition-colors">B.Pharm Notes</Link></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/placement" className="hover:text-purple-400 transition-colors">Placement Prep</Link></li>
            <li><Link to="/gate" className="hover:text-purple-400 transition-colors">GATE Prep</Link></li>
            <li><Link to="/interview" className="hover:text-purple-400 transition-colors">Interview Notes</Link></li>
            <li><Link to="/portfolio" className="hover:text-purple-400 transition-colors">My Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Legal & Founder */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>Disclaimer: This portal is an educational resource hub and is not officially affiliated with AKTU University.</li>
            </ul>
          </div>
          <div>
            <a
              href="https://orbous.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-center text-xs font-bold px-4 py-2 bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 text-white rounded-lg transition-all"
            >
              Founder @ Orbous (orbous.com)
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-10 pt-6 text-center text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} AKTU Notes Hub. Built for AKTU students.</span>
        <span>
          Founder: <span className="text-gray-400 font-semibold">Ramjee Kumar Yadav</span> | Company: <span className="text-gray-400 font-semibold">Orbous</span>
        </span>
      </div>
    </footer>
  );
}
