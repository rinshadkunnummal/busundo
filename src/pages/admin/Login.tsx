import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app with Supabase Auth, you'd use supabase.auth.signInWithPassword()
    // For this simple implementation, we compare against a PIN in .env
    const correctPin = import.meta.env.VITE_ADMIN_PIN || "1234";

    if (pin === correctPin) {
      // Store the auth state simply in sessionStorage
      sessionStorage.setItem("isAdminAuthed", "true");
      navigate("/admin");
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  return (
    <section className="min-h-screen bg-zinc-50 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-zinc-200/50 border border-zinc-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="font-sora text-2xl font-bold text-zinc-900">Admin Access</h1>
          <p className="font-inter text-zinc-500 mt-2">Enter your secure PIN to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <input
              type="password"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full font-inter bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-4 text-center text-2xl tracking-[0.5em] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-inter font-semibold py-3.5 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Authenticate
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
