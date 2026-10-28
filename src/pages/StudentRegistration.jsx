
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Utensils,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100";

function Field({ label, icon: Icon, ...props }) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input className={inputClass} {...props} />
      </div>
    </div>
  );
}

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hostel: "",
    room: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.hostel.trim() || !form.room.trim()) {
      setError("Please enter your hostel and room details.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Demo only: store a profile, not the password.
    // Real registration should use a secure backend.
    const profile = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone,
      hostel: form.hostel.trim(),
      room: form.room.trim(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("messmate_demo_students") || "[]"
      );

      if (existing.some((student) => student.email === profile.email)) {
        setError("An account with this email already exists. Please log in.");
        return;
      }

      localStorage.setItem(
        "messmate_demo_students",
        JSON.stringify([...existing, profile])
      );

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      setError("Unable to save your demo account in this browser.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f9f6] px-4 py-8 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-green-900/5 lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-16 -top-12 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/5" />

          <Link to="/" className="relative flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700">
              <Utensils size={25} />
            </span>
            <span>
              <span className="block text-2xl font-extrabold">MessMate</span>
              <span className="text-sm text-green-100">Eat well. Live well.</span>
            </span>
          </Link>

          <div className="relative py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold">
              <CheckCircle2 size={15} />
              STUDENT COMMUNITY
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight">
              Your hostel life, made better.
            </h1>
            <p className="mt-4 leading-7 text-green-50">
              Explore daily meals, share feedback, and stay connected with your
              hostel dining community.
            </p>
          </div>

          <p className="relative text-sm text-green-100">
            A better dining experience starts here.
          </p>
        </aside>

        <section className="p-5 sm:p-9 lg:p-10">
          <Link to="/" className="inline-flex items-center gap-2 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <Utensils size={21} />
            </span>
            <span className="text-xl font-extrabold text-gray-900">MessMate</span>
          </Link>

          <div className="mt-5 sm:mt-0">
            <p className="text-sm font-semibold text-green-700">
              CREATE YOUR ACCOUNT
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Student registration
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enter your details to get started with MessMate.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800"
            >
              Registration successful! Redirecting to login…
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field
              id="name"
              name="name"
              label="Full name"
              icon={UserRound}
              placeholder="Enter your full name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="email"
                name="email"
                label="Email address"
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Field
                id="phone"
                name="phone"
                label="Mobile number"
                icon={Phone}
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit number"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="hostel"
                name="hostel"
                label="Hostel name"
                icon={Building2}
                placeholder="Enter hostel name"
                value={form.hostel}
                onChange={handleChange}
                required
              />

              <Field
                id="room"
                name="room"
                label="Room number"
                icon={Building2}
                placeholder="e.g. A-204"
                value={form.room}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass} pr-12`}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-green-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm password
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  className={`${inputClass} pr-12`}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  aria-label={showConfirm ? "Hide confirmation" : "Show confirmation"}
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-gray-500 hover:text-green-700"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={success}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Create student account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-green-700 hover:text-green-800">
              Log in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
