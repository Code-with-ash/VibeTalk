import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation , useNavigate } from "react-router-dom";
const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const handleVerify = async () => {
    try {
      const otpValue = otp.join("");
      const res = await axios.post("http://localhost:8000/auth/verify-otp", { email, otp: otpValue });
      console.log(res);
      if(res.status==200){
        if(res.data.isNewUser){
          localStorage.setItem("tempToken", res.data.tempToken);
          navigate("/avatar", { state: { email } });
        }
        else{
          localStorage.setItem("token", res.data.token);
          navigate("/home", { state: { email } });
        }
      }
    }
    catch (err) {
      console.log("error")
      console.log(err);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white px-4">

      <div className="w-full max-w-md bg-[#141414] border border-gray-800 rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-center mb-2">
          Verify OTP 🔐
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Enter the 6-digit code sent to your device
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-xl bg-[#0f0f0f] border border-gray-700 rounded-lg outline-none focus:border-purple-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          disabled={otp.some((digit) => digit === "")}
          onClick={handleVerify}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-lg font-medium transition">
          Verify OTP
        </button>

        {/* Resend */}
        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <span className="text-white">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-purple-500 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Otp;