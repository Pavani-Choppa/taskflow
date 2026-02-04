import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-8 h-8 rounded-md bg-teal-500 flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          TaskFlow
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-slate-700 hover:text-slate-900 text-sm font-medium cursor-pointer"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
