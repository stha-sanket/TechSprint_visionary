const LoginPage = () => {
  return (
    <>
      <div className="w-screen h-screen bg-purple-100 m-0 p-0">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col h-[20%] justify-center pb-3">
            <div className="">
              <h1 className="text-4xl text-center  font-bold">
                Learn<span className="text-blue-500">.ai</span>
              </h1>
              <p className="text-center w-[70%] pt-1 mx-auto text-sm">
                Learn your curriculum with the help of Augmented reality.
              </p>
            </div>
          </div>
          <div className="bg-white w-full h-[80%] rounded-t-[3rem] px-8 pt-12 flex flex-col items-center">
            <h2 className="text-center font-bold text-lg mb-8 text-gray-800">
              Please Log in to continue
            </h2>
            <form className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-600 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm"
                />
                <div className="flex justify-end">
                  <a
                    href="/forgot-password"
                    className="text-xs text-purple-600 font-medium hover:text-purple-800 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all mt-4 text-lg">
                Log In
              </button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4 w-full">
              <div className="flex items-center w-full gap-2">
                <div className="h-px bg-gray-300 flex-1"></div>
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>

              <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95">
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
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
