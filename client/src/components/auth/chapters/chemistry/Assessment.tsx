import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../redux/store";
import {
  fetchAssessment,
  submitAnswer,
  nextQuestion,
  resetAssessment,
} from "../../../../redux/slices/assessmentSlice";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { chapterId } = useParams<{ chapterId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const {
    assessment,
    loading,
    error,
    currentQuestionIndex,
    userAnswers,
    score,
    showResults,
  } = useSelector((state: RootState) => state.assessment);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (chapterId) {
      // Extract number if it comes as "chem_1" or just "1"
      const chapterNum = chapterId.includes("_")
        ? chapterId.split("_")[1]
        : chapterId;
      dispatch(
        fetchAssessment({ subjectId: "Chemistry", chapterNumber: chapterNum }),
      );
    }
    return () => {
      dispatch(resetAssessment());
    };
  }, [dispatch, chapterId]);

  if (loading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-dvh flex items-center justify-center bg-gray-50">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="h-dvh flex flex-col p-4 bg-gray-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 mb-4">
          <div className="prose prose-sm md:prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {assessment?.description}
            </ReactMarkdown>
          </div>
          <div className="mt-8 flex justify-center pb-4">
            <button
              onClick={() => setStarted(true)}
              className="w-full md:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors active:scale-95"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="h-dvh flex flex-col items-center justify-center p-4 bg-gray-50 animate-in fade-in duration-500">
        <div className="bg-white p-6 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-3xl font-bold text-green-600">
              {Math.round((score / (assessment?.questions.length || 1)) * 100)}%
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Assessment Complete!
          </h2>
          <p className="text-gray-600 text-lg">
            You scored {score} out of {assessment?.questions.length}
          </p>
          <button
            onClick={() => navigate("/dashboard/chemistry")}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-colors active:scale-95"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = assessment?.questions[currentQuestionIndex];

  return (
    <div className="h-dvh flex flex-col bg-gray-50">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 shrink-0">
        <div
          className="bg-green-500 h-2 transition-all duration-300"
          style={{
            width: `${
              ((currentQuestionIndex + 1) /
                (assessment?.questions.length || 1)) *
              100
            }%`,
          }}
        />
      </div>

      <div className="flex-1 flex flex-col p-4 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto flex flex-col h-full">
          {/* Question */}
          <div className="bg-white p-6 rounded-3xl shadow-lg flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {currentQuestion?.question}
            </h3>

            <div className="space-y-3 flex-1 overflow-y-auto">
              {currentQuestion?.options.map(
                (
                  option: { option: string; isCorrect: boolean },
                  idx: number,
                ) => (
                  <button
                    key={idx}
                    onClick={() =>
                      dispatch(
                        submitAnswer({
                          questionId: currentQuestion._id,
                          answer: option.option,
                        }),
                      )
                    }
                    className={`w-full p-4 text-left rounded-2xl border-2 transition-all active:scale-[0.98] ${
                      userAnswers[currentQuestion._id] === option.option
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 shrink-0 flex items-center justify-center ${
                          userAnswers[currentQuestion._id] === option.option
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {userAnswers[currentQuestion._id] === option.option && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                        )}
                      </div>
                      <span className="text-base text-gray-700 font-medium">
                        {option.option}
                      </span>
                    </div>
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-4 shrink-0">
            <button
              onClick={() => dispatch(nextQuestion())}
              disabled={!userAnswers[currentQuestion?._id || ""]}
              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 ${
                userAnswers[currentQuestion?._id || ""]
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex === (assessment?.questions.length || 0) - 1
                ? "Finish"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
