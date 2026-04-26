import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store";
import { logout } from "../store/slices/authSlice";
import { Icon, Button } from "@components/export/index";
import { NotificationService, type NotificationItem } from "../services/services/notification-service";

const getNavigationLinks = (role?: string) => {
  if (role === "DONOR") {
    return [
      { name: "Restaurant Overview", path: "/dashboard", icon: "activity" as const },
      { name: "List Food", path: "/dashboard/list-food", icon: "plus" as const },
      { name: "Donation Feed", path: "/dashboard/deliveries", icon: "mapPin" as const },
      { name: "Donation History", path: "/dashboard/history", icon: "clock" as const },
      { name: "Messages", path: "/dashboard/messages", icon: "messageSquare" as const },
    ];
  }
  if (role === "NGO") {
    return [
      { name: "NGO Overview", path: "/dashboard", icon: "activity" as const },
      { name: "List Food", path: "/dashboard/list-food", icon: "plus" as const },
      { name: "Nearby Donations", path: "/dashboard/deliveries", icon: "mapPin" as const },
      { name: "Distribution History", path: "/dashboard/history", icon: "clock" as const },
      { name: "Messages", path: "/dashboard/messages", icon: "messageSquare" as const },
    ];
  }
  return [
    { name: "Volunteer Dashboard", path: "/dashboard", icon: "activity" as const },
    { name: "Active Deliveries", path: "/dashboard/deliveries", icon: "mapPin" as const },
    { name: "My History", path: "/dashboard/history", icon: "clock" as const },
    { name: "Schedule", path: "/dashboard/schedule", icon: "calendar" as const },
    { name: "Messages", path: "/dashboard/messages", icon: "messageSquare" as const },
  ];
};

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  const navigationLinks = getNavigationLinks(user?.role);
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    NotificationService.getNotifications().then(setNotifications).catch(() => setNotifications([]));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#F7F9FA] overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col flex-shrink-0 relative z-20 shadow-sm">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50 shrink-0 gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-sm">
            <Icon name="leafCustom" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none">FoodBridge</h1>
            <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider">
              {user?.role === "DONOR" ? "Restaurant Portal" : user?.role === "NGO" ? "NGO Portal" : "Volunteer Portal"}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
                  isActive
                    ? "bg-brand-primary text-white shadow-md shadow-green-600/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <Icon name={link.icon} size={18} />
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Area */}
        <div className="p-4 border-t border-gray-50 shrink-0">
          <Button
            buttonType="destructive"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 justify-start bg-red-50 text-red-600 hover:bg-red-100 px-4 py-3 shadow-none border-none"
          >
            <Icon name="logOut" size={18} />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F7F9FA]">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 shrink-0 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger Placeholder */}
            <Button buttonType="tertiary" className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Icon name="menu" size={24} />
            </Button>
          </div>

          <div className="flex items-center gap-5">
            {/* Notifications */}
            <div className="relative group">
            <Button buttonType="tertiary" className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Icon name="bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] rounded-full border-2 border-white flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
            <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-900">Notifications</p>
              </div>
              <div className="max-h-72 overflow-auto">
                {notifications.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => NotificationService.markAsRead(item.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-b-0"
                  >
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{item.message}</p>
                  </button>
                ))}
                {notifications.length === 0 && <p className="px-4 py-6 text-sm text-gray-400">No updates yet.</p>}
              </div>
            </div>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Profile Dropdown Block instead of static content */}
            <div className="relative group cursor-pointer flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 leading-none">
                  {user?.name || "Guest Environment"}
                </p>
                <p className="text-xs text-brand-primary mt-1 uppercase font-bold tracking-wider">
                  {user?.role === "VOLUNTEER" ? "Top Contributor" : user?.role || "Member"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 border-2 border-brand-primary/20 flex items-center justify-center overflow-hidden ring-2 ring-transparent transition-all group-hover:ring-brand-primary/30">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-brand-primary font-bold text-sm">{user?.name ? user.name[0].toUpperCase() : "G"}</span>
                )}
              </div>
              {/* Simple CSS-only dropdown menu overlay */}
              <div className="absolute top-full right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col p-2 z-50">
                <div className="px-3 py-2 border-b border-gray-50 mb-1">
                   <p className="text-xs text-gray-500 font-semibold">{user?.email || "Unknown Email"}</p>
                </div>
                <Button buttonType="tertiary" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 font-semibold hover:bg-gray-50 rounded-lg text-left justify-start">
                  <Icon name="settings" size={16} /> Profile Settings
                </Button>
                <Button buttonType="tertiary" onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-lg text-left justify-start">
                  <Icon name="logOut" size={16} /> Secure Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
