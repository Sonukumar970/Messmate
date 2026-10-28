import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  Star,
  MessageSquareWarning,
  ShieldCheck,
  X,
} from "lucide-react";

const studentLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/menu", label: "Daily Menu", icon: Utensils },
  { to: "/feedback", label: "Ratings & Feedback", icon: Star },
  {
    to: "/complaints",
    label: "My Complaints",
    icon: MessageSquareWarning,
  },
];

const adminLinks = [
  { to: "/admin", label: "Admin Dashboard", icon: ShieldCheck },
];

export default function Sidebar({
  isOpen,
  onClose,
  isAdmin,
}) {
  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-100 bg-white p-5 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-xl text-white">
              <Utensils size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                MessMate
              </h1>
              <p className="text-xs text-gray-500">
                Eat well. Live well.
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-9">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
            {isAdmin ? "Administration" : "Student Portal"}
          </p>

          <nav className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto rounded-2xl bg-green-50 p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700">
            <Utensils size={18} />
          </div>
          <p className="text-sm font-semibold text-gray-800">
            Your food, your voice
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-600">
            Share your feedback and help improve hostel meals.
          </p>
        </div>
      </aside>
    </>
  );
}