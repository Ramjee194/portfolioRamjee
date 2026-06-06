import React, { useState, useEffect } from "react";
import { IoMail, IoSparkles, IoChatbubbleEllipses, IoPaperPlane, IoShieldCheckmark } from "react-icons/io5";
import AktuNavbar from "../components/AktuNavbar";
import AktuFooter from "../components/AktuFooter";

export default function ContactPage() {
  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Real-time guestbook messaging state
  const [messages, setMessages] = useState([]);
  const [adminKeys, setAdminKeys] = useState({}); // Stores inline reply texts
  const [adminToken, setAdminToken] = useState(""); // Owner key to post replies
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const API_URL = "http://localhost:5000/api/messages";

  // 1. Fetch live messages from MongoDB (polling every 4 seconds)
  const fetchMessages = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Error fetching live messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, []);

  // 2. Handle Contact Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: "loading", message: "Sending your message to database..." });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        fetchMessages(); // Refresh feed immediately
      } else {
        const data = await res.json();
        setSubmitStatus({ type: "error", message: data.error || "Failed to save message." });
      }
    } catch (err) {
      setSubmitStatus({ type: "error", message: "Backend offline. Check if local server is running." });
    }
  };

  // 3. Handle Owner Reply Submission
  const handleReplySubmit = async (messageId) => {
    const replyText = adminKeys[messageId];
    if (!replyText || !replyText.trim()) return;

    // A simple secure check (owner typing their admin key: e.g. "admin123")
    if (adminToken !== "admin123") {
      alert("Invalid Admin Key. Only Ramjee can reply to messages.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/${messageId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyText }),
      });

      if (res.ok) {
        setAdminKeys((prev) => ({ ...prev, [messageId]: "" }));
        fetchMessages();
      } else {
        alert("Failed to submit reply.");
      }
    } catch (err) {
      alert("Error posting reply. Backend connection issue.");
    }
  };

  const handleReplyTextChange = (messageId, val) => {
    setAdminKeys((prev) => ({ ...prev, [messageId]: val }));
  };

  const faqs = [
    { q: "Are all PDF notes on this website free?", a: "Yes, all syllabus maps, previous year papers, unit notes, and lab files are 100% free to read and download." },
    { q: "How can I replace/update the placeholder PDF documents?", a: "Go to the public/notes folder inside the repository and replace the files with your actual PDFs matching the filenames (e.g. java-interview.pdf)." },
    { q: "Where does the real-time guestbook save data?", a: "It saves data directly to your MongoDB cluster database cluster0 via the Express server API." }
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-16 flex flex-col justify-between selection:bg-purple-500/30">
      <AktuNavbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 text-purple-400">
            Contact Support & Guestbook
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Submit your feedback or leave a message on the live MongoDB guestbook below.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Side: Contact Form & FAQ */}
          <div className="lg:col-span-6 flex flex-col gap-8">

            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
                <IoMail className="text-purple-400" />
                <span>Send Message</span>
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-400">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-400">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-400">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-white/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <IoPaperPlane />
                  <span>Send Message</span>
                </button>

                {submitStatus.message && (
                  <div className={`p-3 rounded-xl text-xs font-bold text-center mt-2 ${submitStatus.type === "success"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : submitStatus.type === "loading"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>

            {/* FAQs */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-3">
                Frequently Asked Questions
              </h3>
              <div className="flex flex-col gap-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-sm font-bold text-white">{faq.q}</span>
                    <span className="text-xs text-gray-400 leading-relaxed">{faq.a}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Live MongoDB Guestbook / Message Feed */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-5">

              <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <IoChatbubbleEllipses className="text-purple-400" />
                  <span>Live Guestbook</span>
                </h3>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>

              {/* Developer Admin Reply Token input */}
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 text-left self-start"
                >
                  {showAdminPanel ? "Hide Admin Panel" : "Reply to messages? (Owner settings)"}
                </button>
                {showAdminPanel && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <input
                      type="password"
                      placeholder="Enter Owner Admin Key..."
                      value={adminToken}
                      onChange={(e) => setAdminToken(e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                      <IoShieldCheckmark className="text-green-500" />
                      <span>Key: admin123</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Message Feed Display */}
              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg._id} className="flex flex-col gap-3 p-4 rounded-xl bg-white/5 border border-white/5">

                      {/* Client Question */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-purple-400">{msg.name}</span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {new Date(msg.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-300">{msg.subject}</span>
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed bg-black/20 p-2.5 rounded-lg">
                          {msg.message}
                        </p>
                      </div>

                      {/* Developer Answer / Reply */}
                      {msg.reply && (
                        <div className="flex flex-col gap-1 border-l-2 border-pink-500 pl-3 ml-2 bg-pink-500/5 p-2 rounded-r-lg">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">
                            Founder Reply
                          </span>
                          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                            {msg.reply}
                          </p>
                        </div>
                      )}

                      {/* Owner inline reply input */}
                      {showAdminPanel && adminToken === "admin123" && (
                        <div className="flex items-center gap-2 mt-2 border-t border-white/5 pt-2.5">
                          <input
                            type="text"
                            placeholder="Type reply..."
                            value={adminKeys[msg._id] || ""}
                            onChange={(e) => handleReplyTextChange(msg._id, e.target.value)}
                            className="flex-1 p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white focus:outline-none"
                          />
                          <button
                            onClick={() => handleReplySubmit(msg._id)}
                            className="px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs"
                          >
                            Reply
                          </button>
                        </div>
                      )}

                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-600 text-sm">
                    No messages left yet. Be the first to type above!
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      <AktuFooter />
    </div>
  );
}
