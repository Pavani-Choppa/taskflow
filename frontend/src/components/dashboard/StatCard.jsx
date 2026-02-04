export default function StatCard({ title, value, icon, bg }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
        {icon}
      </div>
    </div>
  );
}
