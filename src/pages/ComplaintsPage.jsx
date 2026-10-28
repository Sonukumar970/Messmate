
import { useState } from "react";
import {
  MessageSquareWarning,
  Send,
  Clock3,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { initialComplaints } from "../data/mockData.js";

const categories = [
  "Food Quality",
  "Food Quantity",
  "Hygiene",
  "Late Serving",
  "Other",
];

const statusStyles = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Resolved: "bg-green-100 text-green-800",
};

function getStatusIcon(status) {
  if (status === "Resolved") return CheckCircle2;
  if (status === "In Progress") return LoaderCircle;
  return Clock3;
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState(
    (initialComplaints || []).map((item) => ({
      ...item,
      status: item.status || "Pending",
    }))
  );

  const [category, setCategory] = useState("Food Quality");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (description.trim().length < 10) {
      setSuccess("Please describe your complaint in at least 10 characters.");
      return;
    }

    const newComplaint = {
      id: Date.now(),
      category,
      description: description.trim(),
      status: "Pending",
      date: new Date().toLocaleDateString("en-IN"),
    };

    setComplaints((previous) => [newComplaint, ...previous]);
    setDescription("");
    setCategory("Food Quality");
    setSuccess("Your complaint has been registered successfully.");
  }

  const pendingCount = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const progressCount = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedCount = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-green-700">
          STUDENT PORTAL / COMPLAINTS
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          My Complaints
        </h1>
        <p className="mt-2 text-gray-500">
          Report a food-related issue and track its progress.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Pending",
            count: pendingCount,
            icon: Clock3,
            color: "text-amber-600 bg-amber-50",
          },
          {
            label: "In Progress",
            count: progressCount,
            icon: LoaderCircle,
            color: "text-blue-600 bg-blue-50",
          },
          {
            label: "Resolved",
            count: resolvedCount,
            icon: CheckCircle2,
            color: "text-green-600 bg-green-50",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={21} />
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold text-gray-900">
                {item.count}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <MessageSquareWarning className="text-green-700" />
            Register a complaint
          </h2>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Complaint category
            </label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Describe the issue
            </label>
            <textarea
              id="description"
              rows={5}
              maxLength={1000}
              minLength={10}
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Explain what happened, when it happened, and what needs improvement..."
              className="w-full resize-y rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
            />
            <p className="mt-1 text-right text-xs text-gray-400">
              {description.length}/1000
            </p>
          </div>

          {success && (
            <p
              role="status"
              className={`text-sm ${
                success.includes("successfully")
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            <Send size={18} />
            Submit Complaint
          </button>
        </form>

        <section className="space-y-4 lg:col-span-3">
          <h2 className="text-xl font-bold text-gray-900">
            Complaint History
          </h2>

          {complaints.length ? (
            complaints.map((complaint, index) => {
              const status = complaint.status || "Pending";
              const StatusIcon = getStatusIcon(status);

              return (
                <article
                  key={complaint.id ?? index}
                  className="rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {complaint.category || complaint.title || "General Complaint"}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {complaint.date || complaint.createdAt || "Previously submitted"}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[status] || statusStyles.Pending
                      }`}
                    >
                      <StatusIcon size={14} />
                      {status}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {complaint.description || complaint.message || "No description provided."}
                  </p>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
              <MessageSquareWarning className="mx-auto mb-3 text-gray-400" size={32} />
              <p className="font-semibold text-gray-800">No complaints yet</p>
              <p className="mt-2 text-sm text-gray-500">
                If you face a problem with your meal, you can report it here.
              </p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
