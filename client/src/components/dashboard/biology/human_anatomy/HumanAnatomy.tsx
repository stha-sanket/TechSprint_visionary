import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_BIOLOGY_CHAPTERS } from "../mockData";
import "@google/model-viewer";

const HumanAnatomy: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"learn" | "assess">("learn");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (
      chapterId &&
      MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS]
    ) {
      setData(
        MOCK_BIOLOGY_CHAPTERS[chapterId as keyof typeof MOCK_BIOLOGY_CHAPTERS],
      );
    } else {
      setData(null);
    }
    setLoading(false);
  }, [chapterId]);

  const handleAnswer = (option: string) => {
    if (option === data.description.assessment[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < data.description.assessment.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#0c0c2e] text-white flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-medium">
            Loading Anatomy Explorer...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-screen bg-[#0c0c2e] text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-400">
          Chapter Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          We couldn't find the anatomy chapter you're looking for. It might have
          been moved or deleted.
        </p>
        <button
          onClick={() => navigate("/dashboard/biology")}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20"
        >
          Return to Biology
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#0c0c2e] to-[#1a1a3e] text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center z-20 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/biology")}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate max-w-[150px] md:max-w-none">
              {data.name}
            </h1>
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest font-medium">
              Biology • {data.topic}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setMode("learn")}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                mode === "learn"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setMode("assess")}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                mode === "assess"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Assess
            </button>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Mobile Mode Toggle (Small screens only) */}
        <div className="sm:hidden flex bg-black/40 p-2 border-b border-white/10">
          <button
            onClick={() => setMode("learn")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === "learn" ? "bg-blue-600 text-white" : "text-white/40"
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => setMode("assess")}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === "assess" ? "bg-blue-600 text-white" : "text-white/40"
            }`}
          >
            Assess
          </button>
        </div>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Content Panel */}
        <aside
          className={`fixed md:relative inset-y-0 left-0 w-80 md:w-96 border-r border-white/10 bg-[#0c0c2e] md:bg-black/20 backdrop-blur-xl flex flex-col z-50 md:z-10 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 md:p-6 flex-1 overflow-y-auto custom-scrollbar">
            {mode === "learn" ? (
              <div className="space-y-8">
                <section>
                  <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center gap-2">
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
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Overview
                  </h2>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {data.description.description}
                  </p>
                </section>

                {data.description.fullContent && (
                  <section className="space-y-6">
                    <h2 className="text-lg font-bold text-blue-400 flex items-center gap-2">
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
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      Key Structures
                    </h2>
                    {data.description.fullContent.map(
                      (item: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors group"
                        >
                          <h3 className="font-bold text-sm mb-2 text-white group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-xs leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      ),
                    )}
                  </section>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <h2 className="text-lg font-bold mb-6 text-purple-400 flex items-center gap-2">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Knowledge Check
                </h2>

                {!showResult ? (
                  <div className="space-y-6 flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs text-white/40 font-bold uppercase tracking-widest">
                        Question {currentQuestion + 1} of{" "}
                        {data.description.assessment.length}
                      </span>
                      <span className="text-xs text-blue-400 font-bold">
                        {Math.round(
                          (currentQuestion /
                            data.description.assessment.length) *
                            100,
                        )}
                        % Complete
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                        style={{
                          width: `${(currentQuestion / data.description.assessment.length) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <h3 className="text-lg font-medium leading-snug mb-8">
                      {data.description.assessment[currentQuestion].question}
                    </h3>

                    <div className="space-y-3">
                      {data.description.assessment[currentQuestion].options.map(
                        (option: string, idx: number) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className="w-full p-4 text-left rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-sm font-medium group flex items-center justify-between"
                          >
                            <span>{option}</span>
                            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                              <div className="w-2 h-2 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform"></div>
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                    <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                      <span className="text-3xl font-bold text-blue-400">
                        {score}/{data.description.assessment.length}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      Assessment Complete!
                    </h3>
                    <p className="text-white/50 text-sm mb-8">
                      {score === data.description.assessment.length
                        ? "Perfect score! You've mastered this topic."
                        : "Great effort! Keep studying to improve your score."}
                    </p>
                    <button
                      onClick={resetAssessment}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 md:p-6 border-t border-white/10 bg-black/40">
            <div className="flex items-center gap-3 text-xs text-white/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Interactive 3D Model Active</span>
            </div>
          </div>
        </aside>

        {/* 3D Viewer Section */}
        <section className="flex-1 relative bg-black/40 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none"></div>

          <model-viewer
            id="anatomy-viewer"
            src={data.threeDModels[0]}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            autoplay
            shadow-intensity="1.2"
            exposure="1.2"
            interaction-prompt="auto"
            alt={`3D model of ${data.name}`}
            scale={data.scale || "1 1 1"}
            ar-scale="auto"
            ar-placement="floor"
            touch-action="pan-y"
            loading="eager"
            reveal="auto"
            auto-rotate
            auto-rotate-delay="1000"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          >
            <div slot="ar-failure" className="hidden">
              AR not available
            </div>
          </model-viewer>

          {/* Floating Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:bottom-8 md:right-8 flex flex-col gap-3 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-xl p-3 md:p-5 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl max-w-none md:max-w-[240px] pointer-events-auto">
              <h3 className="font-bold text-[10px] md:text-sm mb-2 md:mb-3 text-blue-400 uppercase tracking-widest">
                Navigation
              </h3>
              <div className="flex md:flex-col gap-4 md:gap-3">
                <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-white/60">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </div>
                  <span>Pinch to Zoom</span>
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs text-white/60">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </div>
                  <span>Drag to Rotate</span>
                </div>
              </div>

              <button
                onClick={() =>
                  (
                    document.querySelector("#anatomy-viewer") as any
                  )?.activateAR()
                }
                className="w-full mt-3 md:mt-5 py-2.5 md:py-3 bg-white text-black rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs flex items-center justify-center gap-2 hover:bg-blue-400 hover:text-white transition-all active:scale-95"
              >
                <svg
                  className="w-3 h-3 md:w-4 md:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                View in AR
              </button>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default HumanAnatomy;
