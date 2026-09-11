import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Search,
  FileCheck,
  BarChart3,
  Settings,
  ShieldCheck,
  Bell,
  UserCircle,
  LogOut,
  History,
  BadgeCheck,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

type Props = {
  children: ReactNode;
};

function DashboardLayout({ children }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = auth.currentUser;

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Verify Job",
      path: "/verify-job",
      icon: Search,
    },
    {
      name: "Offer Letter",
      path: "/offer-letter",
      icon: FileCheck,
    },
    {
      name: "Recruiter Check",
      path: "/recruiter-verification",
      icon: BadgeCheck,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
    {
      name: "Scan History",
      path: "/scan-history",
      icon: History,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const currentPage =
    menu.find((item) => item.path === location.pathname)?.name ||
    "Dashboard";

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050c1a] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#080f1e] border-r border-gray-800/60 flex flex-col shrink-0">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-gray-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">
                JobShield<span className="text-violet-400"> AI</span>
              </h2>
              <p className="text-xs text-gray-500">Secure Hiring Platform</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-violet-600 text-white font-semibold shadow-md shadow-violet-500/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Panel */}
        <div className="border-t border-gray-800/60 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <UserCircle size={20} className="text-violet-400" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold truncate text-white">
                {user?.email?.split("@")[0] || "Guest User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "No Email"}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-red-400 py-2.5 text-sm font-semibold transition-all duration-200"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="h-16 border-b border-gray-800/60 bg-[#080f1e]/80 backdrop-blur flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-white">{currentPage}</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <Bell size={18} className="text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5">
              <div className="w-7 h-7 rounded-full bg-violet-600/30 flex items-center justify-center">
                <UserCircle size={16} className="text-violet-400" />
              </div>
              <span className="text-sm text-gray-300 font-medium">
                {user?.email?.split("@")[0] || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;