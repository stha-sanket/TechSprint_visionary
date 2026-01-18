import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col items-center pt-4">
        <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-500 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] mb-4">
          {user?.name?.charAt(0) || "S"}
        </div>
        <h1 className="text-2xl font-bold text-gray-700">
          {user?.name || "Student Name"}
        </h1>
        <p className="text-gray-400 text-sm">
          {user?.email || "Class 12 • Science Stream"}
        </p>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 p-3 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] text-center">
          <p className="text-xl font-bold text-gray-700">12</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            Courses
          </p>
        </div>
        <div className="bg-gray-200 p-3 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] text-center">
          <p className="text-xl font-bold text-gray-700">85%</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            Avg Score
          </p>
        </div>
        <div className="bg-gray-200 p-3 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] text-center">
          <p className="text-xl font-bold text-gray-700">45h</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
            Study Time
          </p>
        </div>
      </div>

      <div className="bg-gray-200 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] overflow-hidden">
        {["Account Settings", "Notifications", "Help & Support", "Log Out"].map(
          (item, i) => (
            <button
              key={i}
              onClick={item === "Log Out" ? handleLogout : undefined}
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-300/30 transition-colors border-b border-gray-300/30 last:border-0"
            >
              <span
                className={`text-sm font-medium ${item === "Log Out" ? "text-red-400" : "text-gray-600"}`}
              >
                {item}
              </span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default Profile;
