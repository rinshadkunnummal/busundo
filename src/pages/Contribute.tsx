import { useState } from "react";
import { PlusCircle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { submitNewBus } from "../services/departure.service";

export default function Contribute() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    bus_name: "",
    destination: "",
    departure_time: "",
    bus_type: "",
    submitted_by: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate time format (HH:MM)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.departure_time)) {
        throw new Error("Invalid time format. Please use a valid time.");
      }

      await submitNewBus({
        bus_name: formData.bus_name.trim(),
        destination: formData.destination.trim(),
        departure_time: `${formData.departure_time}:00`, // Append seconds for SQL TIME
        bus_type: formData.bus_type.trim() || undefined,
        submitted_by: formData.submitted_by.trim(),
      });

      setSuccess(true);
      setFormData({
        bus_name: "",
        destination: "",
        departure_time: "",
        bus_type: "",
        submitted_by: "",
      });
    } catch (err: any) {
      console.error("Failed to submit:", err);
      setError(err.message || "Failed to submit bus data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-50 py-12">
      <div className="mx-auto max-w-xl px-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-zinc-200/50 border border-zinc-100">
          <div className="mb-8">
            <h1 className="font-sora text-3xl font-bold text-zinc-900 mb-2">
              Add a Missing Bus
            </h1>
            <p className="font-inter text-zinc-600">
              Can't find a bus on the schedule? Help the community by adding it to the board. Your submission will be reviewed by admins.
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-sora text-xl font-bold text-emerald-900 mb-2">
                Thank You!
              </h2>
              <p className="font-inter text-emerald-700 mb-6">
                Your bus submission has been sent for review. Once verified, it will appear on the live departure board.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="font-inter font-semibold text-emerald-700 bg-white border border-emerald-200 px-6 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
              >
                Submit Another Bus
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="bus_name" className="font-inter text-sm font-semibold text-zinc-900">
                    Bus Name (Required)
                  </label>
                  <input
                    id="bus_name"
                    required
                    type="text"
                    placeholder="e.g. Kalyani, KSRTC"
                    value={formData.bus_name}
                    onChange={(e) => setFormData({ ...formData, bus_name: e.target.value })}
                    className="w-full font-inter bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="destination" className="font-inter text-sm font-semibold text-zinc-900">
                    Destination (Required)
                  </label>
                  <input
                    id="destination"
                    required
                    type="text"
                    placeholder="e.g. Kozhikkode"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full font-inter bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="departure_time" className="font-inter text-sm font-semibold text-zinc-900">
                    Departure Time (Required)
                  </label>
                  <input
                    id="departure_time"
                    required
                    type="time"
                    value={formData.departure_time}
                    onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
                    className="w-full font-inter bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="bus_type" className="font-inter text-sm font-semibold text-zinc-900 flex justify-between">
                    <span>Bus Type</span>
                    <span className="text-zinc-400 font-normal">Optional</span>
                  </label>
                  <input
                    id="bus_type"
                    type="text"
                    placeholder="e.g. Limited Stop, Fast Passenger"
                    value={formData.bus_type}
                    onChange={(e) => setFormData({ ...formData, bus_type: e.target.value })}
                    className="w-full font-inter bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="submitted_by" className="font-inter text-sm font-semibold text-zinc-900">
                    Your Name (Required)
                  </label>
                  <input
                    id="submitted_by"
                    required
                    type="text"
                    placeholder="e.g. Rinshad"
                    value={formData.submitted_by}
                    onChange={(e) => setFormData({ ...formData, submitted_by: e.target.value })}
                    className="w-full font-inter bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white font-inter font-semibold py-3.5 rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
                Submit Bus Data
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
