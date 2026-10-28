import {
  Sunrise,
  Sun,
  Coffee,
  Moon,
  Clock3,
  ArrowRight,
} from "lucide-react";

const iconMap = {
  Sunrise,
  Sun,
  Coffee,
  Moon,
};

const colors = {
  morning: "bg-amber-50 text-amber-700",
  afternoon: "bg-orange-50 text-orange-700",
  evening: "bg-purple-50 text-purple-700",
  night: "bg-indigo-50 text-indigo-700",
};

export default function MealCard({ meal }) {
  const Icon = iconMap[meal.icon] || Sunrise;

  return (
    <article className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            colors[meal.id] || "bg-green-50 text-green-700"
          }`}
        >
          <Icon size={24} />
        </div>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          Today's Menu
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-gray-900">
        {meal.name}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <Clock3 size={14} />
        {meal.time}
      </div>

      <p className="mt-3 min-h-10 text-sm leading-5 text-gray-500">
        {meal.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {meal.items.map((item) => (
          <span
            key={item}
            className="rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm font-medium text-green-700">
          <span>{meal.items.length} food items</span>
          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />
        </div>
      </div>
    </article>
  );
}