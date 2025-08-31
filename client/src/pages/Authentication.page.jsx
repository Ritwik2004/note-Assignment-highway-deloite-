import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.components.jsx";
import { Mail } from "lucide-react";
import googleLogo from "../assets/google.logo.svg";
import { useGoogleLogin } from "@react-oauth/google";
import {
  googleAuth,
  sendOtp,
  Signin,
  Signup,
  verifyOtp,
} from "../context/AuthContext.jsx";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  // Steps
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [fullName, setFullname] = useState("");
  const [DOB, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // Timer for resend OTP
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const navigate = useNavigate();

  // ---------------- OTP FLOW ----------------
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await sendOtp(email);
      setOtpSent(true);
      setTimer(60); // start 1 minute countdown
      alert("OTP sent! Check your email.");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to send OTP.");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await verifyOtp(email, otp);
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid OTP.");
    }
    setLoading(false);
  };

  // ---------------- SIGN UP ----------------
  const handleSignUp = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      const res = await Signup({
        fullName,
        DOB,
        email,
      });
      if (res.data.message == 'Success') {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("Name", fullName);
        localStorage.setItem("Email", email);
        navigate("/dashboard");
      }
      else {
        alert(res.data.message)
      }
    } catch (err) {
      console.error("SignUp failed", err);
      alert("Registration failed");
    }
    setLoading(false)
  };

  // ---------------- SIGN IN ----------------
  const handleSignIn = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
      const res = await Signin({ email });
      console.log(res.data)
      if (res.data.message == 'Success') {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("Email", res.data.userData.email);
        localStorage.setItem("Name", res.data.userData.name);
        navigate("/dashboard");
      }
      else {
        alert(res.data.message)
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed");
    }
    setLoading(false)
  };

  // ---------------- GOOGLE ----------------
  const responseGoogle = async (authResult) => {
    setLoadingGoogle(true);
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;

        if (!isSignUp && keepLoggedIn) {
          // signin + keep logged in
          localStorage.setItem("authToken", result.data.token);
          localStorage.setItem("Name", name);
          localStorage.setItem("Email", email);
          localStorage.setItem("Pic", image || "");
        } else if (!isSignUp) {
          // signin without keep logged in
          sessionStorage.setItem("authToken", result.data.token);
          sessionStorage.setItem("Name", name);
          sessionStorage.setItem("Email", email);
          sessionStorage.setItem("Pic", image || "");
        } else {
          // signup → always localStorage
          localStorage.setItem("authToken", result.data.token);
          localStorage.setItem("Name", name);
          localStorage.setItem("Email", email);
          localStorage.setItem("Pic", image || "");
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error while requesting google code : ", error);
    }
    setLoadingGoogle(false);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <AuthLayout>
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <p className="mt-2 text-gray-600">
          {isSignUp
            ? "Sign up to enjoy the features of HD"
            : "Please sign in to continue to your account."}
        </p>

        <form
          onSubmit={isSignUp ? handleSignUp : handleSignIn}
          className="mt-8 space-y-6"
        >
          <div className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullname(e.target.value)}
                    disabled={otpSent}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Jonas Khanwald"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    required
                    value={DOB}
                    onChange={(e) => setDob(e.target.value)}
                    disabled={otpSent}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={otpSent && !otpVerified}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="jonas_kahnwald@gmail.com"
                />
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div>
                <label className="text-sm font-medium text-gray-700">OTP</label>
                <input
                  type="password"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={timer > 0 || loading}
                  className={`mt-2 text-sm font-medium ${timer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-500 underline cursor-pointer"
                    }`}
                >
                  {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
              </div>
            )}
          </div>

          {/* Step buttons */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-3 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                ""
              )}
              Verify Your Email
            </button>
          )}

          {otpSent && !otpVerified && (
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-3 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              ) : (
                ""
              )}
              Verify OTP
            </button>
          )}

          {otpVerified && (
            <>
              {!isSignUp && (
                <div className="flex items-center">
                  <input
                    id="keep-logged-in"
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="keep-logged-in"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Keep me logged in
                  </label>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
                ) : (
                  ""
                )}
                Submit
              </button>
            </>
          )}
        </form>

        {/* GOOGLE SIGN-IN */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="w-full py-3 rounded-md text-sm font-medium border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loadingGoogle ? (
              <span className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></span>
            ) : (
              <img src={googleLogo} alt="Google Logo" className="w-5 h-5" />
            )}
            {isSignUp ? "Signup with Google" : "Sign in with Google"}
          </button>
        </div>

        {/* Toggle */}
        {isSignUp ? (
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setIsSignUp(false)}
              className="font-medium underline text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-gray-600">
            Need an account?{" "}
            <span
              onClick={() => setIsSignUp(true)}
              className="font-medium underline text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Create one
            </span>
          </p>
        )}
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
