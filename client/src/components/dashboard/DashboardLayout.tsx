import { Outlet, useNavigate, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="w-screen h-screen bg-[#e0e5ec] flex flex-col relative">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto pb-24 scrollbar-hide">
        <Outlet />
      </div>

      {/* This is the navigation dock section for the main application*/}
      <div className="fixed bottom-0 left-0 w-full bg-[#e0e5ec] shadow-[0_-8px_20px_rgba(163,177,198,0.4)] rounded-t-[2.5rem] px-6 py-4 flex justify-between items-center z-50 h-20">
        {/* Home */}
        <button
          onClick={() => navigate("/dashboard/home")}
          className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/home") ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive("/dashboard/home") ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${isActive("/dashboard/home") ? "text-white" : "text-gray-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Home</span>
        </button>

        {/* Chemistry */}
        <button
          onClick={() => navigate("/dashboard/chemistry")}
          className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/chemistry") ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive("/dashboard/chemistry") ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${isActive("/dashboard/chemistry") ? "text-white" : "text-gray-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            Chemistry
          </span>
        </button>

        {/* Self Study */}
        <button
          onClick={() => navigate("/dashboard/self-study")}
          className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/self-study") ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive("/dashboard/self-study") ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${isActive("/dashboard/self-study") ? "text-white" : "text-gray-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">
            Self Study
          </span>
        </button>

        {/* Biology */}
        <button
          onClick={() => navigate("/dashboard/biology")}
          className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/biology") ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive("/dashboard/biology") ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${isActive("/dashboard/biology") ? "text-white" : "text-gray-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Biology</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/dashboard/profile")}
          className={`flex flex-col items-center gap-1 transition-all ${isActive("/dashboard/profile") ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isActive("/dashboard/profile") ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${isActive("/dashboard/profile") ? "text-white" : "text-gray-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
