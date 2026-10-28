
import { Link } from "react-router-dom";
import MealCard from "../components/MealCard.jsx";
import {
  Star,
  MessageSquareWarning,
  CalendarDays,
  ArrowUpRight,
  Heart,
  Utensils,
  Sparkles,
  Clock3,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

import {
  mealSlots,
  recentFeedback,
  initialComplaints,
  hostelInfo,
} from "../data/mockData.js";

function SummaryCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <article className="group min-w-0 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-4 break-words text-3xl font-extrabold text-gray-900">
            {value}
          </p>
        </div>

        <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon size={21} strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-500">{subtitle}</p>
    </article>
  );
}

function SectionHeader({ title, subtitle, to, linkLabel = "View all" }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      <Link
        to={to}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
      >
        {linkLabel}
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

function getComplaintStyle(status) {
  if (status === "Resolved") return "bg-green-50 text-green-700";
  if (status === "In Progress") return "bg-blue-50 text-blue-700";
  return "bg-amber-50 text-amber-700";
}

export default function StudentDashboard() {
  const averageRating = recentFeedback.length
    ? (
        recentFeedback.reduce(
          (total, review) => total + Number(review.rating || 0),
          0
        ) / recentFeedback.length
      ).toFixed(1)
    : "—";

  const openComplaints = initialComplaints.filter(
    (complaint) => complaint.status !== "Resolved"
  ).length;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="w-full min-w-0 space-y-8 pb-6 sm:space-y-10">
      {/* Welcome banner */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 px-5 py-7 text-white shadow-lg shadow-green-900/10 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full border-[35px] border-white/10 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -bottom-24 right-8 -z-10 h-56 w-56 rounded-full bg-lime-400/10 sm:right-16 sm:h-72 sm:w-72" />

        <div className="relative max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white sm:text-sm">
            <Sparkles size={16} aria-hidden="true" />
            <span>{hostelInfo.hostelName} · Student Portal</span>
          </div>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Good to see you, {hostelInfo.studentName}!
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-green-50 sm:text-base lg:text-lg">
            Great food makes a great day. Explore your meals, share your
            experience, and help us make hostel dining better.
          </p>

          <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap sm:mt-8">
            <Link
              to="/menu"
              style={{ backgroundColor: "#ffffff", color: "#166534" }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold shadow-md transition hover:-translate-y-0.5 hover:shadow-lg min-[420px]:w-auto"
            >
              <span style={{ color: "#166534" }}>Explore Today's Menu</span>
              <ArrowUpRight size={18} color="#166534" aria-hidden="true" />
            </Link>

            <Link
              to="/feedback"
              style={{ color: "#ffffff" }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-semibold transition hover:bg-white/20 min-[420px]:w-auto"
            >
              <Star size={18} aria-hidden="true" />
              Rate Your Meal
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/15 pt-5 text-xs text-green-50 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" />
              {today}
            </span>
            <span className="inline-flex items-center gap-2">
              <Utensils size={16} aria-hidden="true" />
              {mealSlots.length} scheduled meal slots
            </span>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">Your Overview</h2>
          <p className="mt-1 text-sm text-gray-500">
            A quick look at your hostel dining activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Today's Meals"
            value={mealSlots.length}
            subtitle="Scheduled meal periods"
            icon={CalendarDays}
            color="bg-green-50 text-green-700"
          />
          <SummaryCard
            title="Average Food Rating"
            value={recentFeedback.length ? `${averageRating}/5` : "—"}
            subtitle={`${recentFeedback.length} sample reviews`}
            icon={Star}
            color="bg-amber-50 text-amber-700"
          />
          <SummaryCard
            title="Open Complaints"
            value={openComplaints}
            subtitle="Issues awaiting resolution"
            icon={MessageSquareWarning}
            color="bg-orange-50 text-orange-700"
          />
          <SummaryCard
            title="Food Feedback"
            value={recentFeedback.length}
            subtitle="Available review records"
            icon={Heart}
            color="bg-rose-50 text-rose-700"
          />
        </div>
      </section>

      {/* Menu */}
      <section className="min-w-0">
        <SectionHeader
          title="Today's Menu"
          subtitle="Discover what's being served throughout the day."
          to="/menu"
          linkLabel="View full menu"
        />

        {mealSlots.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {mealSlots.map((meal, index) => (
              <MealCard key={meal.id ?? meal.name ?? index} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <Utensils className="mx-auto mb-3 text-gray-400" size={30} />
            <p className="font-semibold text-gray-800">No meals scheduled</p>
            <p className="mt-1 text-sm text-gray-500">
              Check back later for today's menu.
            </p>
          </div>
        )}
      </section>

      {/* Feedback and complaints */}
      <section className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            title="Recent Feedback"
            subtitle="Hear what students are saying."
            to="/feedback"
          />

          <div className="space-y-4">
            {recentFeedback.length ? (
              recentFeedback.slice(0, 3).map((review, index) => (
                <article
                  key={review.id ?? index}
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 transition hover:border-green-100 hover:bg-green-50/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                        {(review.name || "S").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {review.name || "Student"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {review.meal || "Meal feedback"}
                        </p>
                      </div>
                    </div>

                    <div
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-bold text-amber-700"
                      aria-label={`${review.rating} out of 5 stars`}
                    >
                      <Star size={14} fill="currentColor" aria-hidden="true" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="mt-3 break-words text-sm leading-6 text-gray-600">
                    {review.comment || "No comment provided."}
                  </p>
                </article>
              ))
            ) : (
              <p className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                No feedback is available yet.
              </p>
            )}
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeader
            title="Complaint Status"
            subtitle="Keep track of reported issues."
            to="/complaints"
          />

          <div className="space-y-3">
            {initialComplaints.length ? (
              initialComplaints.slice(0, 4).map((complaint, index) => (
                <article
                  key={complaint.id ?? index}
                  className="rounded-xl border border-gray-100 p-4 transition hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 rounded-lg bg-orange-50 p-2 text-orange-700">
                        <MessageSquareWarning size={18} aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="break-words text-sm font-semibold text-gray-900">
                          {complaint.category || "General Complaint"}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {complaint.date || "Previously reported"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getComplaintStyle(complaint.status)}`}
                    >
                      {complaint.status === "Resolved" ? (
                        <CheckCircle2 size={13} aria-hidden="true" />
                      ) : (
                        <Clock3 size={13} aria-hidden="true" />
                      )}
                      {complaint.status || "Pending"}
                    </span>
                  </div>
                  <p className="mt-3 break-words text-sm leading-6 text-gray-600">
                    {complaint.description || "No description provided."}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-xl bg-gray-50 p-6 text-center">
                <CheckCircle2 className="mx-auto mb-2 text-green-600" size={28} />
                <p className="font-semibold text-gray-800">
                  No complaints recorded
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  You're all caught up!
                </p>
              </div>
            )}
          </div>

          {initialComplaints.length > 4 && (
            <Link
              to="/complaints"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800"
            >
              See all complaints
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
      </section>

      {/* Feedback call to action */}
      <section className="flex flex-col gap-4 rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-xl bg-white p-3 text-green-700 shadow-sm">
            <Heart size={22} aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">
              Your opinion makes a difference
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Help improve your hostel dining experience with honest feedback.
            </p>
          </div>
        </div>

        <Link
          to="/feedback"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          Share Feedback
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
