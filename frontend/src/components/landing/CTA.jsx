import { ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24 bg-white text-center">
      <h2 className="text-3xl font-bold text-slate-900">
        Ready to boost your productivity?
      </h2>

      <p className="text-slate-600 mt-4 max-w-xl mx-auto">
        Join thousands of users who trust TaskFlow to manage their tasks and
        achieve their goals.
      </p>

      <Link
        to="/signup"
        className="mt-8 inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition shadow cursor-pointer"
        >
        Get Started for Free
        <ArrowRight size={18} />
      </Link>


      

    </section>
  );
}
