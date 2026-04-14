import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isMuted, setIsMuted] = useState(false);
  const [users, setUsers] = useState([]);
  const [roomInfo, setRoomInfo] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRoomUsers();
  }, [roomId]);

  const fetchRoomUsers = async () => {
    const res = await fetch(`http://localhost:8000/api/room/${roomId}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) { navigate("/login"); return; }
    const data = await res.json();
    setUsers(data.users || []);
    if (data.room) setRoomInfo(data.room);
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const leaveRoom = () => navigate("/home");

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div>
          <h2 className="text-xl font-semibold">🎙 {roomInfo?.name || "Room"}</h2>
          <p className="text-gray-400 text-sm">{users.length} participants</p>
        </div>

        <button onClick={leaveRoom} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
          Leave
        </button>
      </div>

      {/* USERS GRID */}
      <div className="flex-1 p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {users.map((u) => (
          <div
            key={u.user.id}
            className="flex flex-col items-center p-4 rounded-2xl bg-[#141414] border border-gray-800"
          >
            <img
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${u.user.name}`}
              alt="avatar"
              className="w-20 h-20 rounded-full mb-3"
            />
            <p className="font-medium">{u.user.name}</p>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="flex justify-center items-center gap-6 py-6 border-t border-gray-800">

        <button
          onClick={toggleMute}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition ${
            isMuted ? "bg-gray-700" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isMuted ? "🔇" : "🎤"}
        </button>

        <button
          onClick={leaveRoom}
          className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-xl flex items-center justify-center"
        >
          🚪
        </button>

        <button className="w-14 h-14 rounded-full bg-[#141414] border border-gray-700 hover:border-gray-500 text-xl flex items-center justify-center">
          ✋
        </button>

      </div>
    </div>
  );
};

export default Room;