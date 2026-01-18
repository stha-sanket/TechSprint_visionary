import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { type RootState } from "../../redux/store";
import { sendMessage, clearChat } from "../../redux/slices/geminiSlice";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const SelfStudy = () => {
  const dispatch = useAppDispatch();
  const { messages, loading } = useAppSelector(
    (state: RootState) => state.gemini,
  );
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    await dispatch(
      sendMessage({
        message: inputText,
        imageFile: selectedImage || undefined,
      }),
    );

    setInputText("");
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Auto-scroll to bottom
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Status Bar Timer */}
      <div className="bg-gray-200 text-gray-700 px-6 py-3  shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] flex justify-between items-center mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-medium text-sm">AI Study Assistant</span>
        </div>
        <button
          onClick={() => dispatch(clearChat())}
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear Chat
        </button>
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

        <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md">
                AI
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 max-w-[85%] shadow-md">
                Hello! I'm LearnLLM, your personal AI study assistant. Upload an
                image or ask me a question to get started!
              </div>
            </div>
          ) : (
            messages.map((msg: any, idx: number) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md ${
                    msg.role === "user" ? "bg-blue-400" : "bg-gray-900"
                  }`}
                >
                  {msg.role === "user" ? "ME" : "AI"}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-md ${
                    msg.role === "user"
                      ? "bg-blue-400 text-white rounded-tr-none"
                      : "bg-white text-gray-700 rounded-tl-none"
                  }`}
                >
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="Uploaded"
                      className="rounded-lg mb-2 max-w-full h-auto max-h-48 object-contain"
                    />
                  )}
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc ml-4 mb-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-4 mb-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 px-1 rounded text-pink-600 font-mono text-xs">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto my-2 text-xs">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-xs shadow-md">
                AI
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-gray-700 shadow-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t border-gray-300/30 bg-gray-200 shrink-0">
          {imagePreview && (
            <div className="mb-2 relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-lg border-2 border-gray-300"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="hidden"
            />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask LearnLLM..."
              disabled={loading}
              className="w-full pl-12 pr-12 py-3 bg-gray-200 rounded-2xl text-sm focus:outline-none shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] placeholder:text-gray-400 text-gray-700 disabled:opacity-50"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 rounded-lg transition-colors disabled:opacity-50"
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button
              onClick={handleSendMessage}
              disabled={loading || (!inputText.trim() && !selectedImage)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .markdown-content p {
          margin-bottom: 0.5rem;
        }
        .markdown-content p:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default SelfStudy;
