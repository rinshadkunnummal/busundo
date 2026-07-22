import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Clock, XCircle, Loader2, ChevronDown, ShieldCheck } from "lucide-react";
import { submitConfirmation } from "../services/pulse.service";
import type { ConfirmationStatus } from "../types/pulse";

interface ConfirmationActionsProps {
  departureId: number;
  onConfirm?: (status: ConfirmationStatus) => void;
}

export default function ConfirmationActions({ departureId, onConfirm }: ConfirmationActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<ConfirmationStatus | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirm = async (status: ConfirmationStatus) => {
    if (loadingStatus || success) return;
    
    setLoadingStatus(status);
    setErrorMsg("");

    try {
      await submitConfirmation(departureId, status);
      setSuccess(true);
      if (onConfirm) onConfirm(status);
      
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to record.");
    } finally {
      setLoadingStatus(null);
    }
  };

  return (
    <div className="relative mt-1 w-full" ref={menuRef}>
      {success ? (
        <div className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="w-4 h-4" />
          Thanks for verifying!
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border transition-all duration-200 ${
            isOpen 
              ? "bg-zinc-100 border-zinc-300 text-zinc-900" 
              : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="font-inter text-sm font-semibold">Help Verify</span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      )}

      {isOpen && !success && (
        <div className="absolute z-20 left-0 right-0 bottom-full mb-2 p-1.5 rounded-2xl border border-zinc-200 bg-white/95 backdrop-blur-xl shadow-xl animate-in slide-in-from-bottom-2 fade-in duration-200">
          <button
            onClick={() => handleConfirm("on_time")}
            disabled={!!loadingStatus}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 text-emerald-700 transition-colors disabled:opacity-50"
          >
            {loadingStatus === "on_time" ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="font-inter text-sm font-semibold">Left On Time</span>
          </button>
          
          <button
            onClick={() => handleConfirm("late")}
            disabled={!!loadingStatus}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 text-amber-700 transition-colors disabled:opacity-50"
          >
            {loadingStatus === "late" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Clock className="w-5 h-5" />}
            <span className="font-inter text-sm font-semibold">Left Late</span>
          </button>
          
          <button
            onClick={() => handleConfirm("missed")}
            disabled={!!loadingStatus}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-700 transition-colors disabled:opacity-50"
          >
            {loadingStatus === "missed" ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
            <span className="font-inter text-sm font-semibold">Didn't Come</span>
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="absolute z-20 left-0 right-0 bottom-full mb-2 p-2 rounded-xl bg-red-50 text-red-700 text-xs font-medium text-center shadow-lg">
          {errorMsg}
        </div>
      )}
    </div>
  );
}
