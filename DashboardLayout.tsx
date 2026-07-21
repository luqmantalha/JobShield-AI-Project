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
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

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

  const pageTitle =
    menu.find((item) => item.path === location.pathname)?.name ||
    "Dashboard";

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050816] text-white">

      {/* Sidebar */}

      <aside className="w-72 bg-[#111827] border-r border-gray-800 flex flex-col">

        {/* Logo */}

        <div className="px-8 py-8 border-b border-gray-800">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center">
              <ShieldCheck size={26} />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                JobShield
                <span className="text-violet-400"> AI</span>
              </h2>

              <p className="text-sm text-gray-500">
                Secure Hiring Platform
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-6 py-8 space-y-3">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-violet-600 text-white font-semibold shadow-lg"
                    : "text-gray-300 hover:bg-[#1f2937] hover:text-violet-400"
                }`}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </Link>
            );
          })}

        </nav>

        {/* User */}

        <div className="border-t border-gray-800 p-6">

          <div className="flex items-center gap-4">

            <UserCircle
              size={48}
              className="text-violet-400"
            />

            <div className="overflow-hidden">

              <h4 className="font-semibold truncate">
                {user?.email?.split("@")[0] || "Guest User"}
              </h4>

              <p className="text-sm text-gray-500 truncate">
                {user?.email || "No Email"}
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}

      <div className="flex-1 flex flex-col">

        {/* Header */}

        <header className="h-20 border-b border-gray-800 bg-[#08101f] flex items-center justify-between px-10">

          <div>

            <h1 className="text-3xl font-bold">
              {pageTitle}
            </h1>

            <p className="text-gray-400 mt-1">
              Welcome back 👋
            </p>

          </div>

          <div className="flex items-center gap-6">

            <button className="relative">

              <Bell
                size={24}
                className="text-gray-400 hover:text-violet-400 transition"
              />

              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>

            </button>

            <UserCircle
              size={42}
              className="text-violet-400"
            />

          </div>

        </header>

        {/* Page Content */}

        <main className="flex-1 overflow-auto p-10">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;