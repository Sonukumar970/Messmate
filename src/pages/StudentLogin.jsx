
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Utensils,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const students = JSON.parse(
        localStorage.getItem("messmate_demo_students") || "[]"
      );

      const email = form.email.trim().toLowerCase();

      if (!email || !form.password) {
        setError("Please enter your email and password.");
        return;
      }

      // Demo only. Passwords are not saved or verified by a server.
      // This demonstration accepts the email of a registered demo profile.
      const student = students.find((item) => item.email === email);

      if (!student) {
        setError("Account not found. Please register first.");
        return;
      }

      // This is only a frontend demonstration, not secure authentication.
      // Real password verification must happen on your backend.
      const demoSession = {
        name: student.name,
        email: student.email,
        loggedIn: true,
      };

      sessionStorage.setItem(
        "messmate_demo_session",
        JSON.stringify(demoSession)
      );

      navigate("/dashboard");
    } catch {
      setError("Unable to access demo account data. Please try again.");
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
              <ShieldCheck size={15} />
              STUDENT PORTAL
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight">
              Welcome back to your dining community.
            </h1>
            <p className="mt-4 leading-7 text-green-50">
              Check your meals, follow complaint updates, and share feedback
              with your hostel.
            </p>
          </div>

          <p className="relative text-sm text-green-100">
            Your hostel experience, all in one place.
          </p>
        </aside>

        <section className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <Link to="/" className="inline-flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
              <Utensils size={21} />
            </span>
            <span className="text-xl font-extrabold text-gray-900">MessMate</span>
          </Link>

          <div className="mt-6 lg:mt-0">
            <p className="text-sm font-semibold text-green-700">STUDENT LOGIN</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
              Welcome back!
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Log in to access your student dashboard.
            </p>
          </div>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <span className="text-xs text-gray-400">Minimum 8 characters</span>
              </div>

              <div className="relative">
                <LockKeyhole size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
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

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800"
            >
              Log in to MessMate
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-green-50 p-4 text-xs leading-5 text-green-900">
            <strong>Demo mode:</strong> Register an account first in this
            browser. This frontend demo does not verify passwords securely.
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-green-700 hover:text-green-800">
              Register now
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
