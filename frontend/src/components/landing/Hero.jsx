import { Link } from "react-router-dom";
import { Layers, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-28 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
      <div className="max-w-5xl mx-auto text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-teal-300 px-4 py-1.5 rounded-full text-sm mb-6">
          <Layers size={16} />
          Simple. Powerful. Productive.
        </div>

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Manage your tasks with{" "}
          <span className="text-teal-400">clarity</span> <br />
          and <span className="text-teal-400">focus</span>
        </h1>

        <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg">
          TaskFlow helps you organize your work, track progress, and achieve
          your goals. Built for productivity enthusiasts who value simplicity.
        </p>

        <div className="mt-10 flex justify-center gap-4">
            {/* Signup */}
            <Link
                to="/signup"
                className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition shadow-lg cursor-pointer"
            >
                Start for Free
                <ArrowRight size={18} />
            </Link>

            {/* Login */}
            <Link
                to="/login"
                className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium shadow hover:bg-slate-100 transition cursor-pointer"
            >
                Sign in
            </Link>
        </div>

      </div>
    </section>
  );
}
