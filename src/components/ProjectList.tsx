import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { playClickSound, playHoverSound } from '../utils/sound';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ProjectListProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#85898F]">
          Selected Projects
        </span>
        <span className="font-mono text-[10px] text-[#85898F]">
          {PROJECTS.length} Total
        </span>
      </div>

      <div className="border-t border-white/10 divide-y divide-white/10">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              playClickSound();
              onSelectProject(project);
            }}
            onMouseEnter={playHoverSound}
            className="py-4 flex items-center justify-between group cursor-pointer hover:pl-2 transition-all duration-300 select-none"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-medium text-[#F2F3F5] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-[#85898F] border border-white/10">
                    FEATURED
                  </span>
                )}
              </div>
              <p className="font-mono text-[10px] text-[#85898F] uppercase mt-1 group-hover:text-[#C9D3E0] transition-colors">
                {project.category}
              </p>
            </div>

            <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[#F2F3F5] flex items-center gap-1">
              <span className="text-xs font-mono hidden sm:inline text-[#85898F]">View</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {PROJECTS.length > 3 && (
        <button
          onClick={() => {
            playClickSound();
            setShowAll(!showAll);
          }}
          onMouseEnter={playHoverSound}
          className="w-full mt-3 py-2.5 border border-white/10 rounded-lg text-xs font-mono text-[#85898F] hover:text-[#F2F3F5] hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {showAll ? (
            <>
              <span>Collapse Projects</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>View All ({PROJECTS.length}) Projects</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </section>
  );
};
