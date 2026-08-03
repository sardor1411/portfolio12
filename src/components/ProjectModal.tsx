import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { playClickSound, playHoverSound } from '../utils/sound';
import { X, ExternalLink, Code2, Layout, BarChart2, Check, Copy, Play, ShoppingBag } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContactWithSubject: (subject: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContactWithSubject,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  // Simulation State for Interactive Previews
  const [nodes, setNodes] = useState<{ id: number; x: number; y: number; label: string }[]>([
    { id: 1, x: 20, y: 35, label: 'Auth Gateway' },
    { id: 2, x: 50, y: 60, label: 'WebSocket Delta' },
    { id: 3, x: 80, y: 35, label: 'Redis Cache' },
  ]);
  const [simLatency, setSimLatency] = useState(14);
  const [fluidSpeed, setFluidSpeed] = useState(2.5);
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState(false);

  useEffect(() => {
    setActiveTab('overview');
  }, [project]);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      playClickSound();
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleAddNode = () => {
    playClickSound();
    const id = nodes.length + 1;
    const x = Math.floor(Math.random() * 60) + 20;
    const y = Math.floor(Math.random() * 60) + 20;
    setNodes((prev) => [...prev, { id, x, y, label: `Node #${id}` }]);
  };

  const handleAddToCart = () => {
    playClickSound();
    setAddedItem(true);
    setCartCount((prev) => prev + 1);
    setTimeout(() => setAddedItem(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      <div 
        className="w-full max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[90vh] bg-[#0D0E10] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Down Handle Indicator */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto my-2.5 sm:hidden" />

        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] tracking-widest text-[#85898F] uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded font-medium">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#85898F]">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[#85898F] hover:text-[#F2F3F5] flex items-center gap-1 transition-colors min-h-[44px] sm:min-h-0 flex items-center"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
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
        </div>

        {/* Modal Body Scroll Container */}
        <div 
          className="flex-1 overflow-y-auto modal-scroll-container p-5 sm:p-8 space-y-6 sm:space-y-8"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Main Title Header */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F2F3F5]">
              {project.title}
            </h2>
            <p className="text-[#85898F] text-sm sm:text-lg mt-2 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Navigation Tabs (Mobile Touch Heights) */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('overview');
              }}
              className={`flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === 'overview'
                  ? 'bg-white/15 text-white border border-white/20 font-semibold'
                  : 'text-[#85898F] hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Overview & Impact</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('simulation');
              }}
              className={`flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === 'simulation'
                  ? 'bg-white/15 text-white border border-white/20 font-semibold'
                  : 'text-[#85898F] hover:text-white hover:bg-white/5'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Interactive Simulator</span>
            </button>

            {project.codeSnippet && (
              <button
                onClick={() => {
                  playClickSound();
                  setActiveTab('code');
                }}
                className={`flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
                  activeTab === 'code'
                    ? 'bg-white/15 text-white border border-white/20 font-semibold'
                    : 'text-[#85898F] hover:text-white hover:bg-white/5'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Architecture Code</span>
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col"
                  >
                    <span className="font-mono text-[9px] uppercase text-[#85898F] truncate">
                      {metric.label}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-[#F2F3F5] mt-1">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-mono text-xs text-[#85898F] uppercase tracking-wider mb-2">
                  System Overview
                </h4>
                <p className="text-sm sm:text-base text-[#C9D3E0] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-5 rounded-xl bg-red-500/5 border border-red-500/20">
                  <h5 className="font-mono text-xs uppercase text-red-400 tracking-wider mb-2 font-semibold">
                    Engineering Challenge
                  </h5>
                  <p className="text-xs sm:text-sm text-[#85898F] leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h5 className="font-mono text-xs uppercase text-emerald-400 tracking-wider mb-2 font-semibold">
                    Applied Architecture
                  </h5>
                  <p className="text-xs sm:text-sm text-[#85898F] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Tech Stack Badges */}
              <div>
                <h4 className="font-mono text-xs text-[#85898F] uppercase tracking-wider mb-3">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-[#C9D3E0]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE SIMULATION */}
          {activeTab === 'simulation' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase text-[#85898F]">
                    Live Architecture Sandbox ({project.title})
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Interactive Engine
                  </span>
                </div>

                {project.demoPreviewType === 'interactive-ui' && (
                  <div className="space-y-4">
                    <div className="relative h-56 sm:h-64 w-full bg-[#050506] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px]" />
                      
                      {nodes.map((node) => (
                        <div
                          key={node.id}
                          className="absolute p-2.5 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-mono text-white shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
                          style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span>{node.label}</span>
                        </div>
                      ))}

                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                        <line x1="25%" y1="40%" x2="55%" y2="65%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                        <line x1="55%" y1="65%" x2="85%" y2="40%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                      </svg>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                      <button
                        onClick={handleAddNode}
                        className="px-4 py-3 sm:py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[48px] sm:min-h-0"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Add Graph Node</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#85898F]">Delta Latency:</span>
                        <input
                          type="range"
                          min="4"
                          max="80"
                          value={simLatency}
                          onChange={(e) => setSimLatency(Number(e.target.value))}
                          className="accent-white cursor-pointer"
                        />
                        <span className="font-mono text-xs text-white min-w-[40px]">{simLatency}ms</span>
                      </div>
                    </div>
                  </div>
                )}

                {project.demoPreviewType === 'shader-preview' && (
                  <div className="space-y-4">
                    <div className="relative h-56 sm:h-64 w-full bg-[#050506] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center p-4">
                      <div className="flex items-end gap-2 h-32">
                        {[40, 70, 25, 90, 60, 30, 80, 50, 95, 45, 65, 85, 35].map((height, idx) => (
                          <div
                            key={idx}
                            className="w-2.5 sm:w-3 bg-gradient-to-t from-[#3D414B] to-[#C9D3E0] rounded-t transition-all duration-300"
                            style={{
                              height: `${Math.min(100, height * (fluidSpeed / 2.5))}%`,
                              opacity: 0.6 + (idx % 3) * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#85898F]">Frequency Speed:</span>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="1"
                          max="5"
                          step="0.1"
                          value={fluidSpeed}
                          onChange={(e) => setFluidSpeed(Number(e.target.value))}
                          className="accent-white cursor-pointer"
                        />
                        <span className="font-mono text-xs text-white min-w-[30px]">{fluidSpeed}x</span>
                      </div>
                    </div>
                  </div>
                )}

                {project.demoPreviewType === 'commerce-flow' && (
                  <div className="space-y-4">
                    <div className="p-5 bg-[#050506] border border-white/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-[#85898F]">
                          LUX-01
                        </div>
                        <div>
                          <h5 className="font-medium text-white text-sm sm:text-base">VERAMODE Oversized Cashmere Coat</h5>
                          <p className="font-mono text-xs text-[#85898F] mt-1">$1,850 · Sub-100ms Cart</p>
                        </div>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-black font-medium text-xs hover:bg-[#C9D3E0] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>{addedItem ? 'Item Added!' : 'Optimistic Add to Cart'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between font-mono text-xs text-[#85898F]">
                      <span>Cart State: {cartCount} items</span>
                      <span className="text-emerald-400 font-bold">Response Time: 2ms</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CODE SNIPPET */}
          {activeTab === 'code' && project.codeSnippet && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between bg-white/5 px-4 py-2.5 rounded-t-lg border-t border-x border-white/10">
                <span className="font-mono text-xs text-[#85898F]">
                  {project.codeSnippet.filename} ({project.codeSnippet.language})
                </span>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#85898F] hover:text-white cursor-pointer transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 sm:p-5 bg-[#050506] border border-white/10 rounded-b-lg font-mono text-[11px] sm:text-xs text-[#C9D3E0] overflow-x-auto leading-relaxed">
                <code>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 sm:p-6 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-[#85898F] text-center sm:text-left">
            Want a similar system architecture built for your team?
          </p>

          <button
            onClick={() => {
              playClickSound();
              onClose();
              onOpenContactWithSubject(`Inquiry about ${project.title} architecture`);
            }}
            onMouseEnter={playHoverSound}
            className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-full border border-white/20 bg-white/10 text-xs font-mono text-white hover:bg-white/20 transition-all cursor-pointer min-h-[48px] sm:min-h-0 font-bold"
          >
            Discuss {project.title} Architecture ↗
          </button>
        </div>
      </div>
    </div>
  );
};
