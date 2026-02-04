// import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-slate-500">
            {/* Logo */}
            <div className="flex items-center gap-2 font-medium text-slate-700">
            <div className="w-7 h-7 rounded-md bg-teal-500 flex items-center justify-center">
                <Zap size={16} className="text-white" />
            </div>
            TaskFlow
            </div>

            {/* Copyright */}
            <span>© 2026 TaskFlow. All rights reserved.</span>
        </div>
        </footer>
  );
}
