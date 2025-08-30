// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout.components.jsx";
// import { Mail, Eye } from "lucide-react";
// import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google"
// import { googleAuth } from "../context/AuthContext.jsx";

// const SignUp = () => {
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();
//   const PrivateRoute = () => {
//     const isAuthenticated = localStorage.getItem("authToken");
//     if(isAuthenticated){
//       navigate("/dashboard");
//     }
// };

//   // Request OTP
//   const handleGetOtp = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     try {
//       // need route: POST /send-otp
//       await axios.post("need route", { email });
//       setOtpSent(true);
//     } catch (err) {
//       console.error("OTP request failed", err);
//       alert("Error sending OTP");
//     }
//   };

//   // Verify OTP and create account
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const name = e.target.name.value;
//     const dob = e.target.dob.value;
//     const email = e.target.email.value;
//     const otp = e.target.otp.value;

//     try {
//       // need route: POST /verify-otp
//       const res = await axios.post("need route", { name, dob, email, otp });
//       localStorage.setItem("authToken", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("SignUp failed", err);
//       alert("Invalid OTP or registration failed");
//     }
//   };

//   const responseGoogle = async (authResult) => {
//     try {
//       console.log(authResult);
//       if (authResult['code']) {
//         const result = await googleAuth(authResult['code']);
//         const { email, name, image } = result.data.user;
//         localStorage.setItem('authToken', result.data.token)
//         localStorage.setItem('Name', name)
//         localStorage.setItem('Email', email)
//         localStorage.setItem('Pic', image || "")
//         navigate("/dashboard");
//         console.log('result.data.user --- ', result.data.user);
//       }
//     } catch (error) {
//       console.log('Error while requesting google code : ', error)
//     }
//   }
//   const handleGoogleLogin = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: responseGoogle,
//     flow: 'auth-code'
//   })

//   return (
//     <AuthLayout>
//       <div className="max-w-md w-full">
//         <h2 className="text-3xl font-bold text-gray-900">Sign up</h2>
//         <p className="mt-2 text-gray-600">Sign up to enjoy the feature of HD</p>

//         <form onSubmit={otpSent ? handleSignUp : handleGetOtp} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="name" className="text-sm font-medium text-gray-700">
//                 Your Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="Jonas Khanwald"
//                 disabled={otpSent}
//               />
//             </div>
//             <div>
//               <label htmlFor="dob" className="text-sm font-medium text-gray-700">
//                 Date of Birth
//               </label>
//               <input
//                 id="dob"
//                 name="dob"
//                 type="date"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                 disabled={otpSent}
//               />
//             </div>
//             <div className="relative">
//               <label htmlFor="email" className="text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <div className="relative mt-1">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </span>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   required
//                   className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="jonas_kahnwald@gmail.com"
//                   disabled={otpSent}
//                 />
//               </div>
//             </div>

//             {otpSent && (
//               <div className="relative">
//                 <label htmlFor="otp" className="text-sm font-medium text-gray-700">
//                   OTP
//                 </label>
//                 <div className="relative mt-1">
//                   <input
//                     id="otp"
//                     name="otp"
//                     type="text"
//                     required
//                     className="block w-full px-3 py-2 border border-gray-300 rounded-md"
//                     placeholder="Enter 6-digit OTP"
//                   />
//                   <span className="absolute inset-y-0 right-0 flex items-center pr-3">
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//             >
//               {otpSent ? "Sign up" : "Get OTP"}
//             </button>
//           </div>
//         </form>

//         {/* Google Sign-in */}
//         <div className="mt-4">
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Signup with Google
//           </button>
//         </div>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </AuthLayout>
//   );
// };

// export default SignUp;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.components.jsx";
import { Mail, Eye } from "lucide-react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../context/AuthContext.jsx";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  /** -------------------------------
   *  SIGNUP FLOW (OTP)
   * --------------------------------*/
  const handleGetOtp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await axios.post("need route", { email }); // POST /send-otp
      setOtpSent(true);
    } catch (err) {
      console.error("OTP request failed", err);
      alert("Error sending OTP");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const email = e.target.email.value;
    const otp = e.target.otp.value;

    try {
      const res = await axios.post("need route", { name, dob, email, otp }); // POST /verify-otp
      localStorage.setItem("authToken", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("SignUp failed", err);
      alert("Invalid OTP or registration failed");
    }
  };

  /** -------------------------------
   *  SIGNIN FLOW
   * --------------------------------*/
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post("need route", { email, password }); // POST /login
      localStorage.setItem("authToken", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid email or password");
    }
  };

  /** -------------------------------
   *  GOOGLE LOGIN (COMMON)
   * --------------------------------*/
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;
        localStorage.setItem("authToken", result.data.token);
        localStorage.setItem("Name", name);
        localStorage.setItem("Email", email);
        localStorage.setItem("Pic", image || "");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error while requesting google code : ", error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <AuthLayout>
      <div className="max-w-md w-full">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900">
          {isSignUp ? "Sign up" : "Sign in"}
        </h2>
        <p className="mt-2 text-gray-600">
          {isSignUp
            ? "Create your account with OTP verification."
            : "Please sign in to continue to your account."}
        </p>

        {/* Forms */}
        {isSignUp ? (
          /* SIGNUP FORM */
          <form
            onSubmit={otpSent ? handleSignUp : handleGetOtp}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={otpSent}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Jonas Khanwald"
                />
              </div>

              {/* DOB */}
              <div>
                <label htmlFor="dob" className="text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  disabled={otpSent}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={otpSent}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="jonas_kahnwald@gmail.com"
                  />
                </div>
              </div>

              {/* OTP (only after request) */}
              {otpSent && (
                <div className="relative">
                  <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter 6-digit OTP"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <Eye className="h-5 w-5 text-gray-400" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {otpSent ? "Sign up" : "Get OTP"}
              </button>
            </div>
          </form>
        ) : (
          /* SIGNIN FORM */
          <form onSubmit={handleSignIn} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                    placeholder="jonas_kahnwald@gmail.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="••••••••"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Eye className="h-5 w-5 text-gray-400" />
                  </span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            </div>
          </form>
        )}

        {/* Google Sign-in (Shared) */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Continue with Google
          </button>
        </div>

        {/* Toggle between Signin / Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsSignUp(false);
                  setOtpSent(false);
                }}
                className="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </span>
            </>
          ) : (
            <>
              Need an account?{" "}
              <span
                onClick={() => setIsSignUp(true)}
                className="cursor-pointer font-medium text-blue-600 hover:text-blue-500"
              >
                Create now
              </span>
            </>
          )}
        </p>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
