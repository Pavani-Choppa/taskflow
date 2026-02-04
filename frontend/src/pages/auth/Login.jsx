import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Zap, CheckCircle, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  // ✅ hooks MUST be inside the component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-8 h-8 rounded-md bg-teal-500 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          TaskFlow
        </div>

        <div>
          <h1 className="text-4xl font-bold leading-snug">
            Manage your tasks with{" "}
            <span className="text-teal-400">clarity</span> and{" "}
            <span className="text-teal-400">focus</span>
          </h1>

          <ul className="mt-6 space-y-4 text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-teal-400" />
              Intuitive task organization
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-teal-400" />
              Real-time progress tracking
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-teal-400" />
              Secure and private by default
            </li>
          </ul>
        </div>

        <p className="text-sm text-slate-300">
          Your data is encrypted and secure
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-sm text-center text-slate-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-teal-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
