
import { useState } from "react";
import {
  Utensils,
  Plus,
  Pencil,
  Trash2,
  X,
  ClipboardList,
  Clock3,
  CheckCircle2,
  Save,
  ShieldCheck,
} from "lucide-react";
import { mealSlots, initialComplaints } from "../data/mockData.js";

const mealTypes = ["Morning", "Afternoon", "Evening", "Night"];

const statusOptions = ["Pending", "In Progress", "Resolved"];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
};

const emptyForm = {
  name: "Morning",
  items: "",
  time: "",
};

function normalizeMeal(meal, index) {
  return {
    ...meal,
    id: meal.id ?? `meal-${index}`,
    name: meal.name || meal.title || "Morning",
    items: Array.isArray(meal.items)
      ? meal.items.map((item) =>
          typeof item === "string" ? item : item?.name || ""
        )
      : [],
    time: meal.time || "",
  };
}

export default function AdminDashboard() {
  const [meals, setMeals] = useState(() =>
    mealSlots.map(normalizeMeal)
  );

  const [complaints, setComplaints] = useState(() =>
    (initialComplaints || []).map((complaint, index) => ({
      ...complaint,
      id: complaint.id ?? `complaint-${index}`,
      status: complaint.status || "Pending",
    }))
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  const pendingCount = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const progressCount = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm);
    setNotice("");
    setShowForm(true);
  }

  function openEditForm(meal) {
    setEditingId(meal.id);
    setForm({
      name: meal.name,
      items: meal.items.join(", "),
      time: meal.time || "",
    });
    setNotice("");
    setShowForm(true);
  }

  function handleSaveMeal(event) {
    event.preventDefault();

    const items = form.items
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!form.name || items.length === 0) {
      setNotice("Please select a meal period and enter at least one food item.");
      return;
    }

    const duplicate = meals.some(
      (meal) =>
        meal.name === form.name &&
        meal.id !== editingId
    );

    if (duplicate) {
      setNotice(
        `A ${form.name} meal already exists. Edit that meal instead.`
      );
      return;
    }

    if (editingId !== null) {
      setMeals((previous) =>
        previous.map((meal) =>
          meal.id === editingId
            ? { ...meal, ...form, items }
            : meal
        )
      );
      setNotice("Meal updated successfully.");
    } else {
      setMeals((previous) => [
        ...previous,
        {
          id: `meal-${Date.now()}`,
          name: form.name,
          items,
          time: form.time,
        },
      ]);
      setNotice("Meal added successfully.");
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function deleteMeal(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meal?"
    );

    if (!confirmed) return;

    setMeals((previous) => previous.filter((meal) => meal.id !== id));
    setNotice("Meal deleted.");
  }

  function updateComplaintStatus(id, status) {
    setComplaints((previous) =>
      previous.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status }
          : complaint
      )
    );
    setNotice("Complaint status updated.");
  }

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-green-700">
            <ShieldCheck size={17} />
            MESSMATE / ADMIN PORTAL
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-500">
            Manage daily meals and respond to student complaints.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          <Plus size={19} />
          Add Meal
        </button>
      </section>

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          <span>{notice}</span>
          <button
            type="button"
            aria-label="Dismiss message"
            onClick={() => setNotice("")}
          >
            <X size={18} />
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Meal Slots",
            value: meals.length,
            icon: Utensils,
            color: "bg-green-50 text-green-700",
          },
          {
            label: "Total Complaints",
            value: complaints.length,
            icon: ClipboardList,
            color: "bg-purple-50 text-purple-700",
          },
          {
            label: "In Progress",
            value: progressCount,
            icon: Clock3,
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Resolved",
            value: resolvedCount,
            icon: CheckCircle2,
            color: "bg-emerald-50 text-emerald-700",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <span className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
            </article>
          );
        })}
      </section>

      {showForm && (
        <section className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId !== null ? "Edit Meal" : "Add New Meal"}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close meal form"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSaveMeal} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="meal-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Meal period
                </label>
                <select
                  id="meal-name"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
                >
                  {mealTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="meal-time"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Serving time (optional)
                </label>
                <input
                  id="meal-time"
                  value={form.time}
                  onChange={(event) =>
                    setForm({ ...form, time: event.target.value })
                  }
                  placeholder="e.g. 8:00 AM - 9:30 AM"
                  className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="meal-items"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Food items (comma-separated)
              </label>
              <textarea
                id="meal-items"
                required
                rows={3}
                value={form.items}
                onChange={(event) =>
                  setForm({ ...form, items: event.target.value })
                }
                placeholder="Poha, Bread, Tea"
                className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: Rice, Dal, Roti, Sabzi
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
              >
                <Save size={18} />
                {editingId !== null ? "Save Changes" : "Save Meal"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-gray-200 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Manage Daily Menu
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit or remove scheduled meal slots.
          </p>
        </div>

        {meals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {meals.map((meal) => (
              <article
                key={meal.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-xl bg-green-50 p-3 text-green-700">
                      <Utensils size={22} />
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {meal.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {meal.time || "Serving time not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label={`Edit ${meal.name} meal`}
                      onClick={() => openEditForm(meal)}
                      className="rounded-lg p-2 text-blue-700 hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${meal.name} meal`}
                      onClick={() => deleteMeal(meal.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {meal.items.map((item, index) => (
                    <span
                      key={`${meal.id}-${index}`}
                      className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            No meals scheduled. Use Add Meal to create the first meal.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Student Complaints
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Review complaints and update their status.
          </p>
        </div>

        {complaints.length > 0 ? (
          <div className="space-y-3">
            {complaints.map((complaint) => (
              <article
                key={complaint.id}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900">
                      {complaint.category || complaint.title || "General Complaint"}
                    </h3>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                      {complaint.description ||
                        complaint.message ||
                        "No description provided."}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                      {complaint.date || complaint.createdAt || ""}
                    </p>
                  </div>

                  <div className="sm:w-44">
                    <label
                      htmlFor={`status-${complaint.id}`}
                      className="mb-2 block text-xs font-semibold text-gray-500"
                    >
                      Update status
                    </label>
                    <select
                      id={`status-${complaint.id}`}
                      value={complaint.status}
                      onChange={(event) =>
                        updateComplaintStatus(
                          complaint.id,
                          event.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 p-2.5 text-sm outline-none focus:border-green-600"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[complaint.status] ||
                        statusStyles.Pending
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-500">
            No student complaints have been recorded yet.
          </p>
        )}

        <p className="text-sm text-gray-500">
          Pending complaints: <strong>{pendingCount}</strong>
        </p>
      </section>
    </div>
  );
}
