import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, LogOut, Clock, Bus, CheckCircle2 } from "lucide-react";
import { getPendingSubmissions, approveSubmission, rejectSubmission } from "../../services/departure.service";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check
    const isAuthed = sessionStorage.getItem("isAdminAuthed");
    if (!isAuthed) {
      navigate("/admin/login");
      return;
    }

    loadSubmissions();
  }, [navigate]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getPendingSubmissions();
      setSubmissions(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load submissions. " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission: any) => {
    try {
      setActionLoading(submission.id);
      setError("");
      setSuccessMsg("");
      await approveSubmission(submission);
      setSuccessMsg(`Successfully approved bus: ${submission.bus_name}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to approve submission.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setActionLoading(id);
      setError("");
      setSuccessMsg("");
      await rejectSubmission(id);
      setSuccessMsg("Submission rejected.");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to reject submission.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthed");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 text-white rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h1 className="font-sora font-bold text-zinc-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-inter text-sm font-medium text-zinc-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-sora text-3xl font-bold text-zinc-900">Pending Submissions</h2>
            <p className="font-inter text-zinc-500 mt-2">
              Review and approve community contributions to the live board.
            </p>
          </div>
          <div className="bg-white border border-zinc-200 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="font-inter font-semibold text-zinc-900">{submissions.length}</span>
            <span className="font-inter text-sm text-zinc-500">pending</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl font-inter text-sm mb-6 flex items-center gap-3">
            <X className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-4 rounded-2xl font-inter text-sm mb-6 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            {successMsg}
          </div>
        )}

        {submissions.length === 0 ? (
          <div className="bg-white border border-dashed border-zinc-300 rounded-3xl py-20 text-center">
            <Bus className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-sora text-xl font-bold text-zinc-900">All Caught Up!</h3>
            <p className="font-inter text-zinc-500 mt-2 max-w-sm mx-auto">
              There are currently no pending bus submissions to review.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-inter">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-sm font-semibold text-zinc-600">
                    <th className="px-6 py-4">Bus Name</th>
                    <th className="px-6 py-4">Destination</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Submitted By</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-zinc-900">{sub.bus_name}</td>
                      <td className="px-6 py-4 text-zinc-600">{sub.destination}</td>
                      <td className="px-6 py-4">
                        <span className="bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded-md text-sm font-medium">
                          {sub.departure_time.slice(0, 5)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {sub.bus_type || <span className="italic text-zinc-400">Not specified</span>}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-emerald-700 bg-emerald-50/30">
                        {sub.submitted_by}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleApprove(sub)}
                          disabled={actionLoading === sub.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
                        >
                          <Check className="w-4 h-4" />
                          {actionLoading === sub.id ? "Saving..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(sub.id)}
                          disabled={actionLoading === sub.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
