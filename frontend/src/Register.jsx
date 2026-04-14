import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) return;
    try {
      const res = await axios.post("http://localhost:8000/auth/send-otp", {
        email
      });
      if(res.status === 200){
        navigate("/otp", { state: { email } });
      }else{
        alert(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white px-4">
      
      <div className="w-full max-w-md bg-[#141414] border border-gray-800 rounded-2xl p-8 shadow-xl">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Join <span className="text-purple-500">VibeTalk</span>
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Start talking instantly 🚀
        </p>

        {/* Email Input */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-2 block">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 outline-none text-white"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSendOtp}
          disabled={!email}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-lg font-medium transition disabled:opacity-50"
        >
          Send OTP
        </button>

        <p className="text-gray-500 text-sm text-center mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  );
};

export default Register;