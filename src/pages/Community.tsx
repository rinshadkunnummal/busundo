import { useEffect, useState } from "react";
import { Users, Clock, CheckCircle2, TrendingUp, Bus } from "lucide-react";
import { getCommunityStats, getRecentConfirmations } from "../services/pulse.service";

export default function Community() {
  const [stats, setStats] = useState({ totalConfirmations: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, r] = await Promise.all([
          getCommunityStats(),
          getRecentConfirmations()
        ]);
        setStats(s);
        setRecent(r);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-emerald-50/40 to-white" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Community Memory
            </p>

            <h1 className="font-sora mt-2 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              Community Pulse
            </h1>

            <p className="font-inter mt-4 max-w-2xl text-zinc-600">
              See what the Darul Huda community is saying about bus schedules. Real-time reliability data powered by students.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 space-y-5 flex justify-center items-center h-64">
             <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {/* Left Column: Stats & Highlights */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-emerald-100 p-3 rounded-2xl">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-zinc-500">Total Verifications</p>
                    <p className="font-sora text-3xl font-bold text-zinc-900">{stats.totalConfirmations}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
                <h3 className="font-sora text-xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" /> Community Highlights
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-inter text-sm text-zinc-700">Most departures leave exactly on schedule based on community data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-inter text-sm text-zinc-700">Evening buses are more frequently reported as running slightly late.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Column: Recent Activity */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm h-full">
                <h3 className="font-sora text-xl font-semibold text-zinc-900 mb-6">
                  Recent Activity
                </h3>

                {recent.length === 0 ? (
                  <p className="text-zinc-500 text-sm">No recent activity found.</p>
                ) : (
                  <div className="space-y-4">
                    {recent.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl border border-zinc-100 hover:border-emerald-200 transition-colors bg-zinc-50 hover:bg-white">
                        <div className={`p-3 rounded-full ${
                          item.status === 'on_time' ? 'bg-emerald-100 text-emerald-600' : 
                          item.status === 'late' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                        }`}>
                          <Bus className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-sora font-semibold text-zinc-900">
                            {item.departure_board?.bus_name || 'Unknown Bus'} <span className="text-zinc-400 font-normal text-sm ml-2">({item.departure_board?.departure_time?.slice(0, 5)})</span>
                          </p>
                          <p className="font-inter text-sm text-zinc-500">
                            to {item.departure_board?.destination || 'Unknown'}
                          </p>
                        </div>
                        <div className="text-right">
                           <span className={`inline-block font-inter px-3 py-1 text-xs font-semibold rounded-full ${
                            item.status === 'on_time' ? 'bg-emerald-100 text-emerald-700' : 
                            item.status === 'late' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                           }`}>
                            {item.status === 'on_time' ? 'Left On Time' : item.status === 'late' ? 'Left Late' : "Didn't Come"}
                           </span>
                           <p className="font-inter text-xs text-zinc-400 mt-1">
                             {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
