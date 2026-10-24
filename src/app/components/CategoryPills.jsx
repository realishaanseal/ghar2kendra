import React from 'react';
import { CATEGORIES } from '../data/mockIssues';
import { motion } from 'framer-motion';

export default function CategoryPills({ selectedCategory, onSelectCategory, isLight = false }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`relative whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all duration-200 border shrink-0 overflow-hidden ${
              isSelected
                ? 'text-white border-amber-500 bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-500/25'
                : isLight
                ? 'bg-white text-slate-800 border-amber-200/90 hover:border-amber-400 hover:text-slate-950 shadow-xs'
                : 'bg-ink-raised text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            {/* Animated Pill Background with Warm Sunset Gradient */}
            {isSelected && (
              <motion.div
                layoutId="activePillIndicator"
                className="absolute inset-0 bg-orange-600 hover:bg-orange-700 rounded-2xl z-0"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              <span className="text-sm">{cat.icon}</span>
              <span className={isSelected ? 'text-white font-black' : isLight ? 'text-slate-800 font-bold' : 'text-slate-200 font-bold'}>
                {cat.name}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black transition-colors ${
                  isSelected
                    ? 'bg-black/30 text-white'
                    : isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {cat.count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
