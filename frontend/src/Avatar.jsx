import { useState } from "react";
import { Link } from "react-router-dom";

const styles = [
  "adventurer",
  "bottts",
  "pixel-art",
  "fun-emoji",
  "lorelei",
  "thumbs"
];

const Avatar = () => {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const seed = username || "User";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white px-4">

      <div className="w-full max-w-md bg-[#141414] border border-gray-800 rounded-2xl p-8 shadow-xl">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Your Identity 🎭
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Pick a username and avatar
        </p>

        {/* Username Input */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-2 block">
            Username
          </label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-3 outline-none text-white focus:border-purple-500"
          />
        </div>

        {/* Avatar Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {styles.map((style) => {
            const avatarUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;

            return (
              <div
                key={style}
                onClick={() => setSelectedAvatar(avatarUrl)}
                className={`p-2 rounded-xl cursor-pointer transition border ${
                  selectedAvatar === avatarUrl
                    ? "border-purple-500 scale-105"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-full h-20 object-contain"
                />
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <Link
          to="/home"
          onClick={(e) => {
            if (!username || !selectedAvatar) e.preventDefault();
          }}
          className={`w-full block text-center py-3 rounded-lg text-lg font-medium transition ${
            username && selectedAvatar
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </Link>

      </div>
    </div>
  );
};

export default Avatar;