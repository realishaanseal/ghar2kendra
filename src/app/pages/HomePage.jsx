import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CategoryPills from '../components/CategoryPills';
import IssueCard from '../components/IssueCard';
import CityMap from '../components/CityMap';
import ModuleStrip from '../components/civic/ModuleStrip';
import { Map, List, ArrowUpDown, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CivicAPI } from '../api/supabaseClient';

export default function HomePage({ isDarkMode = true }) {
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('feed'); // 'feed' | 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('upvotes'); // 'upvotes' | 'recent' | 'severity'

  const loadIssues = async () => {
    try {
      const data = await CivicAPI.getIssues();
      setIssues(data);
    } catch (err) {
      console.error('Failed to load issues', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();

    const handleUpdate = () => loadIssues();
    const handleClock = () => loadIssues();

    window.addEventListener('civic-issues-updated', handleUpdate);
    window.addEventListener('civic-clock-advanced', handleClock);

    return () => {
      window.removeEventListener('civic-issues-updated', handleUpdate);
      window.removeEventListener('civic-clock-advanced', handleClock);
    };
  }, []);

  // Filter issues by category and search query
  const filteredIssues = issues.filter((issue) => {
    const matchesCategory =
      selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesSearch =
      issue.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.ward?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
    if (sortBy === 'severity') {
      const rank = { critical: 3, high: 2, medium: 1, low: 0 };
      return (rank[b.severity] || 0) - (rank[a.severity] || 0);
    }
    return 0; // default order
  });

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${
      isDarkMode ? 'bg-ink text-slate-100' : 'bg-paper text-slate-900'
    }`}>
      {/* High-Impact Hero with Dynamic Dark/Light Theme */}
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Civic modules: memory, insights, missions, radar, workspaces */}
        <ModuleStrip isDarkMode={isDarkMode} />


        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <CategoryPills
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            isLight={!isDarkMode}
          />

          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            {/* Sort Dropdown */}
            <div className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-bold transition-all ${
              !isDarkMode
                ? 'bg-white text-slate-800 border border-amber-200/90 shadow-md shadow-amber-950/5'
                : 'bg-ink-raised text-slate-300 border border-slate-800 shadow-lg'
            }`}>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`bg-transparent font-black focus:outline-none cursor-pointer ${
                  !isDarkMode ? 'text-amber-700' : 'text-amber-400'
                }`}
              >
                <option value="upvotes" className={!isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  🔥 Most Upvoted
                </option>
                <option value="severity" className={!isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  🚨 High Severity
                </option>
                <option value="recent" className={!isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}>
                  🕒 Most Recent
                </option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className={`flex items-center p-1 rounded-2xl shadow-md ${
              !isDarkMode ? 'bg-white/80 border border-amber-200' : 'bg-ink-raised border border-slate-800'
            }`}>
              <button
                onClick={() => setViewMode('feed')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                  viewMode === 'feed'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/30'
                    : !isDarkMode
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Feed</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition ${
                  viewMode === 'map'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/30'
                    : !isDarkMode
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 ${
            !isDarkMode ? 'text-slate-600' : 'text-slate-400'
          }`}>
            <span>Verified Public Grievances:</span>
            <span className={`font-mono text-sm font-black px-2 py-0.5 rounded-md ${
              !isDarkMode
                ? 'text-amber-800 bg-amber-100 border border-amber-300'
                : 'text-amber-400 bg-amber-950/60 border border-amber-800/60'
            }`}>
              {filteredIssues.length}
            </span>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-amber-600 font-bold hover:underline"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Feed or Map View */}
        {isLoading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">Connecting to Municipal Grid...</p>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div className={`rounded-3xl p-12 text-center border max-w-md mx-auto my-8 shadow-xl ${
            !isDarkMode
              ? 'bg-white border-amber-200 shadow-amber-900/5'
              : 'bg-ink-raised/80 border-slate-800 shadow-2xl'
          }`}>
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
            <h3 className={`text-lg font-bold ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>
              No grievances found
            </h3>
            <p className={`text-xs mt-1 mb-5 ${!isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Try searching a different ward or reset your category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : viewMode === 'map' ? (
          <div className={`rounded-3xl overflow-hidden border shadow-2xl ${
            !isDarkMode ? 'border-amber-200' : 'border-slate-800'
          }`}>
            <CityMap issues={filteredIssues} />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} isLight={!isDarkMode} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modern Civic Footer */}
      <footer className={`mt-24 border-t py-12 px-4 text-center text-xs transition-colors duration-300 ${
        !isDarkMode
          ? 'bg-paper-sunk border-amber-200 text-slate-600'
          : 'bg-ink border-slate-800 text-slate-400'
      }`}>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className={`flex items-center justify-center gap-2 font-extrabold text-sm ${
            !isDarkMode ? 'text-slate-900' : 'text-white'
          }`}>
            <span>🏛️ Ghar2Kendra Governance Grid (घर से केंद्र तक)</span>
            <span>•</span>
            <span className="text-amber-600 font-semibold">Smart Cities Mission Initiative</span>
          </div>
          <p className={`max-w-xl mx-auto leading-relaxed ${!isDarkMode ? 'text-slate-600' : 'text-slate-500'}`}>
            A real-time public grievance, IoT surveillance, and Gemini multimodal AI redressal network operating across Municipal Corporations, DISCOM, and PWD.
          </p>
          <div className="flex items-center justify-center gap-6 pt-2 font-medium">
            <span className="hover:text-amber-600 transition cursor-pointer">Swachh Bharat Urban</span>
            <span className="hover:text-amber-600 transition cursor-pointer">Digital India AI</span>
            <span className="hover:text-amber-600 transition cursor-pointer">National Data Portal</span>
            <span className="hover:text-amber-600 transition cursor-pointer">CPGRAMS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
