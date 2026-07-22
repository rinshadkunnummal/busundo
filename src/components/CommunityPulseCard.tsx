import { Users } from "lucide-react";
import { generatePulseInsight } from "../services/pulse.service";
import type { CommunityPulseMetrics } from "../types/pulse";

interface CommunityPulseCardProps {
  metrics?: CommunityPulseMetrics;
}

export default function CommunityPulseCard({ metrics }: CommunityPulseCardProps) {
  const insight = generatePulseInsight(metrics);

  return (
    <div className={`w-full rounded-2xl p-4 flex gap-4 items-start ${insight.color} bg-opacity-50`}>
      <div className={`p-2 rounded-xl bg-white bg-opacity-60 shrink-0`}>
        <Users className="w-5 h-5 opacity-80" />
      </div>
      <div>
        <p className="font-sora text-sm font-semibold opacity-90 mb-1">Community Pulse</p>
        <p className="font-inter text-sm opacity-80 leading-relaxed">
          {insight.text}
        </p>
      </div>
    </div>
  );
}
