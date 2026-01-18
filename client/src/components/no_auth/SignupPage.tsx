import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser } from "../../redux/slices/authSlice";
import type { RootState } from "../../redux/store";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#e0e5ec] m-0 p-0">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col h-[20%] justify-center pb-3">
            <div className="">
              <h1 className="text-4xl text-center font-bold text-gray-700">
                Learn<span className="text-blue-400">.ai</span>
              </h1>
              <p className="text-center w-[70%] pt-1 mx-auto text-sm text-gray-500">
                Learn your curriculum with the help of Augmented reality.
              </p>
            </div>
          </div>
          <div className="bg-[#e0e5ec] w-full h-[80%] rounded-t-[3rem] px-8 pt-12 flex flex-col items-center shadow-[0_-8px_20px_rgba(163,177,198,0.4)] overflow-y-auto">
            <h2 className="text-center font-bold text-lg mb-8 text-gray-700">
              Create an Account
            </h2>
            <form
              className="w-full flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none text-gray-700 placeholder:text-gray-400 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none text-gray-700 placeholder:text-gray-400 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-[#e0e5ec] shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] focus:outline-none text-gray-700 placeholder:text-gray-400 transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs text-center font-medium">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-2xl shadow-[8px_8px_16px_rgba(163,177,198,0.6),-4px_-4px_12px_rgba(255,255,255,0.5)] active:scale-95 transition-all mt-4 text-lg disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4 w-full pb-8">
              <div className="flex items-center w-full gap-2">
                <div className="h-px bg-gray-400 flex-1"></div>
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="h-px bg-gray-400 flex-1"></div>
              </div>

              <button className="w-full bg-[#e0e5ec] shadow-[8px_8px_16px_rgba(163,177,198,0.6),-4px_-4px_12px_rgba(255,255,255,0.5)] text-gray-700 font-semibold py-3 rounded-2xl hover:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.7),inset_2px_2px_5px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center gap-3 active:scale-95">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-blue-400 font-bold hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
