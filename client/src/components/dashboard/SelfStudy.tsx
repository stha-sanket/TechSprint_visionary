const SelfStudy = () => {
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
              That's a fascinating topic! We can start with the basic principles
              like wave-particle duality or the uncertainty principle. Which one
              would you like to explore first?
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
};

export default SelfStudy;
