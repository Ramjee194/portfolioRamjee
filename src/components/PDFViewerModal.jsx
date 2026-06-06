import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoDownload } from "react-icons/io5";

export default function PDFViewerModal({ isOpen, onClose, pdf }) {
  if (!pdf) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-gray-900/90 border border-white/10 rounded-2xl overflow-hidden z-10 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{pdf.icon}</span>
                <h3 className="text-xl font-bold text-purple-400">
                  {pdf.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* PDF View Container */}
            <div className="p-4 bg-gray-950/50">
              <iframe
                src={`${pdf.pdfPath}#toolbar=0`}
                className="w-full h-[60vh] rounded-xl border border-white/5"
                title={pdf.title}
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-5 gap-4 border-t border-white/10 bg-white/5">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                You can read the PDF above or download it for offline access.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={pdf.pdfPath}
                  download={`${pdf.id}-interview-questions.pdf`}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all text-sm"
                >
                  <IoDownload size={18} />
                  <span>Download</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white rounded-xl font-medium transition-all text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
