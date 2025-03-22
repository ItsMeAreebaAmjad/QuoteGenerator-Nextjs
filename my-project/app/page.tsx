"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsClipboard } from "react-icons/bs";

export default function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quote");
      const data = await res.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote. Please try again!");
      setAuthor("");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-900 transition-all duration-500">
      
      {/* Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/90 shadow-2xl rounded-xl p-10 max-w-xl w-full text-center border border-gray-200"
      >
        {/* Floating Effect */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ✨ Quote of the Day ✨
          </h1>

          {loading ? (
            <p className="animate-pulse text-gray-500">Fetching quote...</p>
          ) : (
            <>
              <p className="text-lg sm:text-xl font-medium italic text-gray-800">
                "{quote}"
              </p>
              <p className="text-sm font-semibold mt-3 text-gray-600">
                - {author}
              </p>
            </>
          )}
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <motion.button
            onClick={fetchQuote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg transition-all w-full sm:w-auto"
          >
            New Quote
          </motion.button>

          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 flex items-center justify-center gap-2 border border-gray-400 text-gray-900 rounded-lg shadow-md bg-white hover:bg-gray-300 transition-all w-full sm:w-auto"
          >
            <BsClipboard className="text-lg" /> {copied ? "Copied!" : "Copy"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
