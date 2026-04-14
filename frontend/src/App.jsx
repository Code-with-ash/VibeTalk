import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Talk Freely.
          <br />
          <span className="text-purple-500">Connect Instantly.</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          VibeTalk lets you join real-time voice rooms with zero friction.
          No installs. No delays. Just pure conversation.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex gap-4">
          <Link to="/home">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-lg transition">
              Join a Room
            </button> 
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition">
          <h3 className="text-xl font-semibold mb-2">⚡ Instant Join</h3>
          <p className="text-gray-400">
            Jump into conversations in under 2 seconds with seamless WebRTC.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition">
          <h3 className="text-xl font-semibold mb-2">🎙 Voice Rooms</h3>
          <p className="text-gray-400">
            Create or join rooms with friends, communities, or strangers.
          </p>
        </div>

        <div className="bg-[#141414] p-6 rounded-2xl border border-gray-800 hover:border-purple-500 transition">
          <h3 className="text-xl font-semibold mb-2">🔒 Private & Secure</h3>
          <p className="text-gray-400">
            Full control over who joins your room with private links.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 pb-6">
        © 2026 VibeTalk. Built with ❤️
      </div>

    </div>
  );
};

export default App;