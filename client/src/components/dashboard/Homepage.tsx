import { useState } from "react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-700">Hi Student</h1>
                <p className="text-gray-400 text-sm">
                  Ready to learn something new?
                </p>
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
              <h3 className="font-semibold text-gray-700 mb-4">
                Recent Lessons
              </h3>
              <div className="space-y-3">
                {[
                  {
                    subject: "Chemistry",
                    topic: "Hydrocarbons",
                    time: "2 hours ago",
                  },
                  {
                    subject: "Biology",
                    topic: "Cell Structure",
                    time: "Yesterday",
                  },
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
      case "chemistry":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-bold text-gray-700">Chemistry</h1>
              <p className="text-gray-400 text-sm">
                Explore the world of matter
              </p>
            </header>

            <div className="relative">
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-2xl text-sm focus:outline-none shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] text-gray-700 placeholder:text-gray-400"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="space-y-4">
              {[
                "Atomic Structure",
                "Chemical Bonding",
                "Thermodynamics",
                "Equilibrium",
              ].map((topic, i) => (
                <div
                  key={i}
                  className="bg-gray-200 p-4 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] flex justify-between items-center group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 text-sm">
                        {topic}
                      </h4>
                      <p className="text-xs text-gray-400">12 Lessons</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-500"
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "biology":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-2xl font-bold text-gray-700">Biology</h1>
              <p className="text-gray-400 text-sm">
                Discover life and living organisms
              </p>
            </header>

            <div className="relative">
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-2xl text-sm focus:outline-none shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] text-gray-700 placeholder:text-gray-400"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="space-y-4">
              {["Cell Biology", "Genetics", "Evolution", "Ecology"].map(
                (topic, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 p-4 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 text-sm">
                          {topic}
                        </h4>
                        <p className="text-xs text-gray-400">8 Lessons</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-500"
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
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        );
      case "self-study":
        return (
          <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Bar Timer */}
            <div className="bg-gray-200 text-gray-700 px-6 py-3 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] flex justify-between items-center mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-sm">Focus Mode Active</span>
              </div>
              <div className="font-mono text-xl font-bold">25:00</div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-gray-200 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] overflow-hidden flex flex-col min-h-0">
              <div className="bg-gray-200 px-4 py-3 border-b border-gray-300/30 flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                  AI
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 text-sm">LearnLLM</h3>
                  <p className="text-[10px] text-green-500 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Online
                  </p>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {/* Mock Messages */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    AI
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[85%] shadow-md">
                    Hello! I'm LearnLLM, your personal AI study assistant. What
                    subject are we focusing on today?
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-blue-400 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    ME
                  </div>
                  <div className="bg-blue-400 p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[85%] shadow-md">
                    I need help understanding Quantum Mechanics.
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md">
                    AI
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[85%] shadow-md">
                    That's a fascinating topic! We can start with the basic
                    principles like wave-particle duality or the uncertainty
                    principle. Which one would you like to explore first?
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-gray-300/30 bg-gray-200 shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask LearnLLM..."
                    className="w-full pl-4 pr-12 py-3 bg-gray-200 rounded-2xl text-sm focus:outline-none shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] placeholder:text-gray-400 text-gray-700"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600 rounded-lg transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col items-center pt-4">
              <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-blue-500 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] mb-4">
                S
              </div>
              <h1 className="text-2xl font-bold text-gray-700">Student Name</h1>
              <p className="text-gray-400 text-sm">Class 12 • Science Stream</p>
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
              {[
                "Account Settings",
                "Notifications",
                "Help & Support",
                "Log Out",
              ].map((item, i) => (
                <button
                  key={i}
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
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen bg-[#e0e5ec] flex flex-col relative">
      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto pb-24 scrollbar-hide">
        {renderContent()}
      </div>

      {/* Bottom Dock */}
      <div className="fixed bottom-0 left-0 w-full bg-[#e0e5ec] shadow-[0_-8px_20px_rgba(163,177,198,0.4)] rounded-t-[2.5rem] px-6 py-4 flex justify-between items-center z-50 h-20">
        {/* Home */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === "home" ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "home" ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${activeTab === "home" ? "text-white" : "text-gray-500"}`}
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
          onClick={() => setActiveTab("chemistry")}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === "chemistry" ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "chemistry" ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${activeTab === "chemistry" ? "text-white" : "text-gray-500"}`}
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
          onClick={() => setActiveTab("self-study")}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === "self-study" ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "self-study" ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${activeTab === "self-study" ? "text-white" : "text-gray-500"}`}
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
          onClick={() => setActiveTab("biology")}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === "biology" ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "biology" ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${activeTab === "biology" ? "text-white" : "text-gray-500"}`}
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
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 transition-all ${activeTab === "profile" ? "text-white" : "text-gray-400"}`}
        >
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTab === "profile" ? "bg-gray-900 shadow-md" : "bg-gray-200 shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)]"}`}
          >
            <svg
              className={`w-5 h-5 ${activeTab === "profile" ? "text-white" : "text-gray-500"}`}
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

export default Homepage;
