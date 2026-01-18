const Home = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">Hi Student</h1>
          <p className="text-gray-400 text-sm">Ready to learn something new?</p>
        </div>
        <div className="w-12 h-12 bg-gray-200 rounded-2xl shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
      </header>

      {/* Study Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-700">12 Days</p>
          <p className="text-xs text-gray-400 mt-1">Study Streak</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-400 rounded-xl flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-700">850</p>
          <p className="text-xs text-gray-400 mt-1">XP Points</p>
        </div>
      </div>

      {/* Current Course */}
      <div className="bg-gray-200 p-5 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)]">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-700 text-sm">
              Continue Learning
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Organic Chemistry - Chapter 4
            </p>
          </div>
          <span className="text-xs text-gray-400 bg-gray-300/50 px-3 py-1 rounded-full">
            65%
          </span>
        </div>
        <div className="w-full bg-gray-300/50 rounded-full h-2 mb-3">
          <div className="bg-gray-900 h-2 rounded-full w-[65%] shadow-sm"></div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">5 of 8 lessons</span>
          <button className="px-4 py-1.5 bg-gray-900 text-white rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all">
            Resume
          </button>
        </div>
      </div>

      {/* Recent Lessons */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-4">Recent Lessons</h3>
        <div className="space-y-3">
          {[
            {
              subject: "Chemistry",
              topic: "Hydrocarbons",
              time: "2 hours ago",
            },
            { subject: "Biology", topic: "Cell Structure", time: "Yesterday" },
          ].map((lesson, i) => (
            <div
              key={i}
              className="bg-gray-200 p-4 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
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
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm">
                    {lesson.subject}
                  </h4>
                  <p className="text-xs text-gray-400">{lesson.topic}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{lesson.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
