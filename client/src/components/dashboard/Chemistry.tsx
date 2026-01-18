import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";
import { useEffect } from "react";
import { fetchChaptersBySubject } from "../../redux/slices/chapterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Chemistry = () => {
  const dispatch = useAppDispatch();

  const { chapters, loading } = useAppSelector(
    (state: RootState) => state.chapter,
  );
  const navigate = useNavigate();

  console.log(chapters);

  useEffect(() => {
    dispatch(fetchChaptersBySubject("Chemistry"));
  }, [dispatch]);
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-700">Chemistry</h1>
        <p className="text-gray-400 text-sm">Explore the world of matter</p>
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
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            Loading chapters...
          </div>
        ) : chapters.length > 0 ? (
          chapters.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(`/dashboard/chemistry/${item.id}`);
              }}
              className="bg-gray-200 w-full p-4 rounded-3xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-8px_-8px_16px_rgba(255,255,255,0.5)] flex justify-between items-center group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-900 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 text-sm">
                    {item.name}
                  </h4>
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
            </button>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            No chapters found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Chemistry;
