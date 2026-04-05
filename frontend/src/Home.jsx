import { useState } from "react";

const roomsData = [
  {
    id: 1,
    name: "Late Night Coding",
    users: 12,
    tags: ["tech", "react"],
  },
  {
    id: 2,
    name: "Chill & Talk",
    users: 8,
    tags: ["chill"],
  },
  {
    id: 3,
    name: "Startup Ideas",
    users: 15,
    tags: ["business"],
  },
];

const categories = ["All", "Tech", "Gaming", "Music", "Chill", "Study"];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-6">

      {/* 🔥 HERO */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Hey Ashmit 👋
        </h1>
        <p className="text-gray-400 mb-6">
          Jump into conversations happening right now
        </p>

        <div className="flex gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl transition">
            🎙 Start a Room
          </button>

          <button className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-xl transition">
            🔗 Join via Code
          </button>
        </div>
      </div>

      {/* 🎯 CATEGORIES */}
      <div className="flex gap-3 mb-8 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
              activeCategory === cat
                ? "bg-purple-600"
                : "bg-[#141414] border border-gray-700 hover:border-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔴 LIVE ROOMS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          🔴 Live Rooms
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {roomsData.map((room) => (
            <div
              key={room.id}
              className="bg-[#141414] border border-gray-800 rounded-2xl p-5 hover:border-purple-500 transition cursor-pointer"
            >
              {/* Room Name */}
              <h3 className="text-lg font-semibold mb-2">
                🎙 {room.name}
              </h3>

              {/* Users */}
              <p className="text-gray-400 mb-3">
                👥 {room.users} people
              </p>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {room.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#1f1f1f] px-2 py-1 rounded-md text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Join Button */}
              <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition">
                Join Room
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* ➕ FLOATING BUTTON */}
      <button className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 w-14 h-14 rounded-full text-2xl shadow-lg transition">
        +
      </button>

    </div>
  );
};

export default Home;