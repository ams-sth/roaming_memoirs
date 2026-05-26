import { MdDelete, MdEdit } from "react-icons/md";
import { FiMapPin, FiCalendar } from "react-icons/fi";

export default function LogCard({ log }) {
  const formattedDate = log.date
    ? new Date(log.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-stone-100 overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img
          src={`http://localhost:5000/assets/images/${log.logImage}`}
          alt={log.tripName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="bg-white/90 hover:bg-white p-1.5 rounded-full shadow text-stone-600 hover:text-amber-600 transition">
            <MdEdit size={16} />
          </button>
          <button className="bg-white/90 hover:bg-white p-1.5 rounded-full shadow text-stone-600 hover:text-red-500 transition">
            <MdDelete size={16} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-serif text-lg font-semibold text-stone-800 mb-2 leading-tight">{log.tripName}</h2>
        <p className="text-stone-500 text-sm mb-3 line-clamp-2">{log.description}</p>
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="flex items-center gap-1"><FiMapPin className="text-amber-500" /> {log.location}</span>
          <span className="flex items-center gap-1"><FiCalendar className="text-amber-500" /> {formattedDate}</span>
        </div>
      </div>
    </div>
  );
};
