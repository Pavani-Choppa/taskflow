import {
  CheckCircle,
  Clock,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    title: "Task Management",
    desc: "Create, organize, and track your tasks with an intuitive interface.",
    icon: CheckCircle,
  },
  {
    title: "Progress Tracking",
    desc: "Monitor productivity with real-time updates and statistics.",
    icon: Clock,
  },
  {
    title: "Analytics Dashboard",
    desc: "Gain insights into completion rates and productivity patterns.",
    icon: BarChart3,
  },
  {
    title: "Secure by Design",
    desc: "Your data is encrypted and protected with enterprise-grade security.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Everything you need to stay productive
        </h2>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
          Powerful features designed to help you manage tasks efficiently and
          achieve more every day.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mt-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-left"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-slate-600 mt-2 text-sm">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
