import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [mode, setMode] = useState("phone"); // "phone" | "email"
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white px-4">

      <div className="w-full max-w-md bg-[#141414] border border-gray-800 rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-2">
          Join <span className="text-purple-500">VibeTalk</span>
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Start talking instantly 🚀
        </p>

        <div className="flex bg-[#1c1c1c] rounded-lg p-1 mb-6">
          <button
            onClick={() => setMode("phone")}
            className={`w-1/2 py-2 rounded-lg transition ${mode === "phone"
                ? "bg-purple-600 text-white"
                : "text-gray-400"
              }`}
          >
            Mobile
          </button>

          <button
            onClick={() => setMode("email")}
            className={`w-1/2 py-2 rounded-lg transition ${mode === "email"
                ? "bg-purple-600 text-white"
                : "text-gray-400"
              }`}
          >
            Email
          </button>
        </div>

        {mode === "phone" ? (
          <div className="mb-6">

            <label className="text-sm text-gray-400 mb-2 block">
              Mobile Number
            </label>

            <div className="flex items-center bg-[#0f0f0f] border border-gray-700 rounded-lg overflow-hidden">

              <span className="px-3 text-gray-300 border-r border-gray-700">
                +91
              </span>

              <input
                type="number"
                placeholder="Enter your number"
                min={10}
                max={10}
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent px-3 py-3 outline-none text-white"
              />
            </div>

          </div>
        ) : (
          <div className="mb-6">

            <label className="text-sm text-gray-400 mb-2 block">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 outline-none text-white"
            />

          </div>
        )}


        <Link
          to="/otp"
          disabled={!phone && !email} 
          className="block w-full text-center bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-lg font-medium transition"
        >
          Send OTP
        </Link>

        <p className="text-gray-500 text-sm text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
};

export default Register;