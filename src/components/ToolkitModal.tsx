import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/sound';
import { X, Cpu, Search } from 'lucide-react';

interface ToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolkitModal: React.FC<ToolkitModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  const categories = ['All', ...SKILL_CATEGORIES.map((cat) => cat.name)];

  const filteredCategories = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    skills: cat.skills.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || cat.name === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }),
  })).filter((cat) => cat.skills.length > 0);

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div 
        className="w-full max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[88vh] bg-[#0D0E10] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Down Handle Indicator */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-[#C9D3E0]" />
            <span className="font-mono text-xs tracking-widest text-[#F2F3F5] uppercase font-bold">
              Toolkit & Architecture Stack
            </span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            onMouseEnter={playHoverSound}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-full border border-white/10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white sm:text-[#85898F] hover:text-white transition-all cursor-pointer min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={playHoverSound}
                className={`text-xs font-mono px-3.5 py-2 rounded-lg border transition-all cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/5 text-[#85898F] border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#85898F]" />
            <input
              type="text"
              placeholder="Search stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-[#85898F] focus:outline-none focus:border-white/30 min-h-[40px] sm:min-h-0"
            />
          </div>
        </div>

        {/* Body Content */}
        <div 
          className="flex-1 overflow-y-auto modal-scroll-container p-5 sm:p-8 space-y-6 sm:space-y-8"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 font-mono text-xs text-[#85898F]">
              No technologies matched your filter query.
            </div>
          ) : (
            filteredCategories.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-mono text-xs text-[#85898F] uppercase tracking-wider flex items-center gap-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  {cat.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm text-[#F2F3F5] group-hover:text-white">
                            {skill.name}
                          </h4>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#85898F]">
                            {skill.experience}
                          </span>
                        </div>
                        <p className="text-xs text-[#85898F] mt-2 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-3">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#3D414B] to-[#C9D3E0] rounded-full"
                            style={{ width: skill.level }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-[#85898F]">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
