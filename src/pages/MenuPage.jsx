
import { useMemo, useState } from "react";
import { Search, CalendarDays, UtensilsCrossed } from "lucide-react";
import { mealSlots } from "../data/mockData.js";
import MealCard from "../components/MealCard.jsx";

const filters = ["All", "Morning", "Afternoon", "Evening", "Night"];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const filteredMeals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mealSlots.filter((meal) => {
      const mealName = String(meal.name || meal.title || "").toLowerCase();

      const items = Array.isArray(meal.items)
        ? meal.items
            .map((item) =>
              typeof item === "string" ? item : item?.name || ""
            )
            .join(" ")
            .toLowerCase()
        : "";

      const matchesSearch =
        !query ||
        mealName.includes(query) ||
        items.includes(query);

      const matchesFilter =
        activeFilter === "All" ||
        mealName === activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <div className="space-y-6">
      <section>
        <p className="mb-2 text-sm font-medium text-green-700">
          STUDENT PORTAL / DAILY MENU
        </p>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Daily Menu
            </h1>
            <p className="mt-2 text-gray-500">
              Explore your meals and see what's cooking today.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
            <CalendarDays size={19} className="text-green-700" />
            {today}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search meals or food items..."
            aria-label="Search meals or food items"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "bg-green-700 text-white"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-green-50 hover:text-green-800"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Available Meals
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {filteredMeals.length} meal slot
              {filteredMeals.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <UtensilsCrossed className="text-green-700" size={24} />
        </div>

        {filteredMeals.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredMeals.map((meal, index) => (
              <MealCard
                key={meal.id ?? meal.name ?? meal.title ?? index}
                meal={meal}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center">
            <Search className="mx-auto mb-3 text-gray-400" size={32} />

            <h3 className="text-lg font-semibold text-gray-800">
              No meals found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
              }}
              className="mt-4 rounded-xl bg-green-700 px-5 py-2.5 font-semibold text-white hover:bg-green-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
