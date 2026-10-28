
import { useState } from "react";
import { Star, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { recentFeedback } from "../data/mockData.js";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [meal, setMeal] = useState("Afternoon");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(recentFeedback || []);
  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (rating < 1) {
      setSuccess("Please select a rating before submitting.");
      return;
    }

    if (!comment.trim()) {
      setSuccess("Please write your feedback.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: "You",
      meal,
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-IN"),
    };

    setReviews((previous) => [newReview, ...previous]);
    setRating(0);
    setComment("");
    setSuccess("Your feedback has been submitted successfully!");
  }

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-green-700">
          STUDENT PORTAL / FEEDBACK
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Ratings & Feedback
        </h1>
        <p className="mt-2 text-gray-500">
          Your feedback helps us improve hostel meals.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-3"
        >
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <MessageSquare className="text-green-700" />
            Share your experience
          </h2>

          <div>
            <label
              htmlFor="meal"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Meal period
            </label>
            <select
              id="meal"
              value={meal}
              onChange={(event) => setMeal(event.target.value)}
              className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
            >
              {["Morning", "Afternoon", "Evening", "Night"].map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-gray-700">
              Rate your meal
            </legend>

            <div className="flex flex-wrap items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} out of 5 stars`}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(value)}
                  className="rounded-lg p-1 transition hover:scale-110"
                >
                  <Star
                    size={32}
                    fill={(hoverRating || rating) >= value ? "#f59e0b" : "none"}
                    color={(hoverRating || rating) >= value ? "#f59e0b" : "#cbd5e1"}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {rating ? `${rating}/5` : "Select rating"}
              </span>
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="feedback"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Your feedback
            </label>
            <textarea
              id="feedback"
              rows={5}
              maxLength={500}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Tell us about food quality, taste, quantity..."
              className="w-full resize-y rounded-xl border border-gray-200 p-3 outline-none focus:border-green-600"
            />
            <p className="mt-1 text-right text-xs text-gray-400">
              {comment.length}/500
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
            Submit Feedback
          </button>
        </form>

        <aside className="rounded-2xl bg-green-800 p-6 text-white lg:col-span-2">
          <div className="mb-4 inline-flex rounded-xl bg-white/15 p-3">
            <Star size={26} />
          </div>
          <h2 className="text-2xl font-bold">Your voice matters!</h2>
          <p className="mt-3 leading-7 text-green-50">
            Honest ratings help hostel management understand what students
            enjoy and what needs improvement.
          </p>
          <div className="mt-6 rounded-xl bg-white/10 p-4">
            <p className="text-sm text-green-100">Feedback submitted here</p>
            <p className="mt-1 text-3xl font-bold">{reviews.length}</p>
          </div>
        </aside>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Feedback</h2>

        {reviews.length ? (
          reviews.map((review, index) => (
            <article
              key={review.id ?? index}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name || review.studentName || "Student"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {review.meal || review.mealType || "Meal"}
                    {review.date ? ` · ${review.date}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={17} fill="currentColor" />
                  <span className="font-semibold">
                    {review.rating ?? 0}/5
                  </span>
                </div>
              </div>

              <p className="mt-3 text-gray-600">
                {review.comment || review.message || review.feedback || "No comment provided."}
              </p>
            </article>
          ))
        ) : (
          <p className="rounded-xl bg-white p-5 text-gray-500">
            No feedback available yet. Be the first to share your experience!
          </p>
        )}
      </section>
    </div>
  );
}
