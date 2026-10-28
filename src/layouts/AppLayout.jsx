
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Menu,
  ShieldCheck,
  UserRound,
  Utensils,
  X,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

const pageTitles = {
  "/dashboard": "Student Dashboard",
  "/menu": "Daily Menu",
  "/feedback": "Ratings & Feedback",
  "/complaints": "My Complaints",
  "/admin": "Admin Dashboard",
};

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname.startsWith("/admin");
  const pageTitle = pageTitles[location.pathname] || "MessMate";

  let student = null;

  try {
    student = JSON.parse(
      sessionStorage.getItem("messmate_demo_session") || "null"
    );
  } catch {
    student = null;
  }

  function handleLogout() {
    sessionStorage.removeItem("messmate_demo_session");
    setProfileOpen(false);
    setIsSidebarOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f9f7] text-gray-900">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[88px] items-center justify-between border-b border-gray-100 px-5">
            <Link
              to="/dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white shadow-sm">
                <Utensils size={25} />
              </span>
              <span>
                <span className="block text-xl font-extrabold tracking-tight">
                  MessMate
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  Eat well. Live well.
                </span>
              </span>
            </Link>

            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              isAdmin={isAdmin}
            />
          </div>

          <div className="m-5 rounded-2xl bg-green-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700">
              <Utensils size={21} />
            </div>
            <h3 className="mt-3 text-sm font-bold text-gray-900">
              Your food, your voice
            </h3>
            <p className="mt-1 text-xs leading-5 text-gray-600">
              Share your feedback and help improve hostel meals.
            </p>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="min-h-screen min-w-0 lg:ml-72">
        <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-3 border-b border-gray-200/80 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setIsSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div className="min-w-0">
              <p className="text-xs text-gray-500 sm:text-sm">
                MessMate / Portal
              </p>
              <h1 className="mt-0.5 truncate text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                {pageTitle}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to={isAdmin ? "/dashboard" : "/admin"}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 sm:px-4"
            >
              <ShieldCheck size={18} />
              <span className="hidden sm:inline">
                {isAdmin ? "Student View" : "Admin View"}
              </span>
            </Link>

            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-2 text-gray-700 transition hover:bg-gray-50 sm:px-3"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800">
                  <UserRound size={18} />
                </span>
                <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
                  {student?.name || "Student"}
                </span>
                <ChevronDown size={15} className="hidden sm:block" />
              </button>

              {profileOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileOpen(false)}
                  />

                  <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
                    <div className="border-b border-gray-100 px-3 py-3">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {student?.name || "Student"}
                      </p>
                      <p className="mt-1 truncate text-xs text-gray-500">
                        {student?.email || "Demo account"}
                      </p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-gray-200 bg-white px-5 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} MessMate · Eat well. Live well.
        </footer>
      </div>
    </div>
  );
}
