import { useState, useRef, useEffect } from "react";
import { Users, Info } from "lucide-react";
import { generatePulseInsight } from "../services/pulse.service";
import type { CommunityPulseMetrics } from "../types/pulse";

interface CommunityPulseCardProps {
  metrics?: CommunityPulseMetrics;
}

export default function CommunityPulseCard({ metrics }: CommunityPulseCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const insight = generatePulseInsight(metrics);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      {/* The Alert Badge */}
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm border border-black/5 hover:-translate-y-0.5 hover:shadow-md ${insight.color}`}
      >
        <Users className="w-4 h-4 opacity-80" />
        <span className="font-inter text-sm font-semibold whitespace-nowrap">Pulse Insight</span>
        <Info className="w-3.5 h-3.5 opacity-60 ml-0.5" />
      </button>
      
      {/* The Hover/Touch Tooltip */}
      {showTooltip && (
        <div className="absolute z-30 bottom-full left-0 mb-3 w-64 p-3.5 rounded-2xl bg-zinc-900 text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
          <p className="font-inter text-sm font-medium leading-relaxed opacity-95">
            {insight.text}
          </p>
          {/* Pointer Triangle */}
          <div className="absolute top-full left-6 -mt-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-900"></div>
        </div>
      )}
    </div>
  );
}
