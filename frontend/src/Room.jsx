import { useState } from "react";

const usersMock = [
  { id: 1, name: "Ashmit", speaking: true },
  { id: 2, name: "Rahul", speaking: false },
  { id: 3, name: "Priya", speaking: false },
  { id: 4, name: "Aman", speaking: true },
];

const Room = () => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">

      {/* 🔝 HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-semibold">🎙 Late Night Coding</h2>
          <p className="text-gray-400 text-sm">12 participants</p>
        </div>

        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
          Leave
        </button>
      </div>

      {/* 👥 USERS GRID */}
      <div className="flex-1 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">

        {usersMock.map((user) => (
          <div
            key={user.id}
            className={`flex flex-col items-center p-4 rounded-2xl transition ${
              user.speaking
                ? "bg-purple-600/20 border border-purple-500"
                : "bg-[#141414] border border-gray-800"
            }`}
          >
            {/* Avatar */}
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
              alt="avatar"
              className="w-20 h-20 rounded-full mb-3"
            />

            {/* Name */}
            <p className="font-medium">{user.name}</p>

            {/* Speaking Indicator */}
            {user.speaking && (
              <span className="text-xs text-purple-400 mt-1">
                Speaking...
              </span>
            )}
          </div>
        ))}

      </div>

      {/* 🎛 CONTROLS */}
      <div className="flex justify-center items-center gap-6 py-6 border-t border-gray-800">

        {/* Mute */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition ${
            isMuted
              ? "bg-gray-700"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isMuted ? "🔇" : "🎤"}
        </button>

        {/* Leave */}
        <button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-xl flex items-center justify-center">
          🚪
        </button>

        {/* Raise Hand */}
        <button className="w-14 h-14 rounded-full bg-[#141414] border border-gray-700 hover:border-gray-500 text-xl flex items-center justify-center">
          ✋
        </button>

      </div>

    </div>
  );
};

export default Room;