import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AktuHome from "./pages/AktuHome";
import NotesPage from "./pages/NotesPage";
import PlacementPage from "./pages/PlacementPage";
import InterviewPage from "./pages/InterviewPage";
import Portfolio from "./pages/Portfolio";
import ContactPage from "./pages/ContactPage";
import GatePage from "./pages/GatePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AktuHome />} />
        <Route path="/notes/:course" element={<NotesPage />} />
        <Route path="/placement" element={<PlacementPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gate" element={<GatePage />} />
      </Routes>
    </Router>
  );
}
