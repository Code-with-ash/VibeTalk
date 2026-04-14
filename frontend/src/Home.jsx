import { useEffect, useState } from "react";

const categories = ["All", "Tech", "Gaming", "Music", "Chill", "Study"];

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [joinId, setJoinId] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [loading, setLoading] = useState(true);

const token = localStorage.getItem("token");

// redirect to login if no token
useEffect(() => {
  if (!token) {
    window.location.href = "/login";
    return;
  }
  fetchUser();
  fetchRooms();
}, []);

const fetchUser = async () => {
  try {
    const res = await fetch("http://localhost:8000/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const data = await res.json();
    setUser(data);
  } catch (err) {
    console.error(err);
  }
};

const fetchRooms = async () => {
  try {
    const res = await fetch("http://localhost:8000/room/my-rooms", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const data = await res.json();
    setRooms(data.rooms || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const createRoom = async () => {
  if (!roomName.trim()) return;

  const res = await fetch("http://localhost:8000/room/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: roomName }),
  });

  const data = await res.json();
  setRoomName("");
  setShowCreate(false);

  if (data.room?.id) {
    window.location.href = `/room/${data.room.id}`; // ← redirect right after create
  }
};

const joinRoom = async () => {
  if (!joinId.trim()) return;

  const res = await fetch("http://localhost:8000/room/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ roomId: joinId }),
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = `/room/${joinId}`; // ← redirect after join
  } else {
    alert(data.message || "Failed to join room"); // room not found etc
  }
};

const filteredRooms = activeCategory === "All"
  ? rooms
  : rooms.filter((r) =>
      r.room?.tags?.some(
        (t) => t.toLowerCase() === activeCategory.toLowerCase()
      )
    );
  return (
    <div style={styles.page}>
      {/* Ambient blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <span style={styles.logoIcon}>🎙</span>
          <span style={styles.logoText}>Vibetalk</span>
        </div>
        {user && (
          <div style={styles.navUser}>
            <span style={styles.navName}>{user.name.toUpperCase()}</span>
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`}
              alt="avatar"
              style={styles.avatar}
            />
          </div>
        )}
      </nav>

      <main style={styles.main}>
        {/* HERO */}
        <section style={styles.hero}>
          <div>
            <p style={styles.greeting}>Good vibes,</p>
            <h1 style={styles.heroTitle}>
              Hey {user ? user.name.split(" ")[0] : "there"} 👋
            </h1>
            <p style={styles.heroSub}>Jump into conversations happening right now</p>
          </div>

          <div style={styles.heroActions}>
            <button style={styles.btnPrimary} onClick={() => { setShowCreate(true); setShowJoin(false); }}>
              <span>🎙</span> Start a Room
            </button>
            <button style={styles.btnSecondary} onClick={() => { setShowJoin(true); setShowCreate(false); }}>
              <span>🔗</span> Join via Code
            </button>
          </div>

          {/* Inline Create Panel */}
          {showCreate && (
            <div style={styles.inlinePanel}>
              <p style={styles.panelLabel}>Room name</p>
              <div style={styles.inputRow}>
                <input
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && createRoom()}
                  placeholder="e.g. Late Night Coding"
                  style={styles.input}
                  autoFocus
                />
                <button style={styles.btnPrimary} onClick={createRoom}>Create</button>
                <button style={styles.btnGhost} onClick={() => setShowCreate(false)}>✕</button>
              </div>
            </div>
          )}

          {/* Inline Join Panel */}
          {showJoin && (
            <div style={styles.inlinePanel}>
              <p style={styles.panelLabel}>Room ID or invite code</p>
              <div style={styles.inputRow}>
                <input
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                  placeholder="Paste room ID here"
                  style={styles.input}
                  autoFocus
                />
                <button style={styles.btnGreen} onClick={joinRoom}>Join</button>
                <button style={styles.btnGhost} onClick={() => setShowJoin(false)}>✕</button>
              </div>
            </div>
          )}
        </section>

        {/* CATEGORIES */}
        <div style={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat ? styles.catActive : styles.catInactive}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LIVE ROOMS */}
        <section>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.liveDot} /> Live Rooms
            </h2>
            {/* <span style={styles.roomCount}>{filteredRooms.length} active</span> */}
          </div>

          {loading ? (
            <div style={styles.emptyState}>Loading rooms...</div>
          ) : filteredRooms.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={{ fontSize: 32, marginBottom: 8 }}>🎙</p>
              <p>No rooms yet. Start one!</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {filteredRooms.map((r) => {
                const room = r.room || r;
                return (
                  <div
                    key={room.id}
                    style={styles.card}
                    onClick={() => (window.location.href = `/room/${room.id}`)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#7c3aed";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#1f1f2e";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={styles.cardTop}>
                      <span style={styles.cardIcon}>🎙</span>
                      <span style={styles.liveTag}>LIVE</span>
                    </div>
                    <h3 style={styles.cardTitle}>{room.name}</h3>
                    <p style={styles.cardId}>ID: {room.id?.slice(0, 8)}...</p>

                    {room.tags?.length > 0 && (
                      <div style={styles.tags}>
                        {room.tags.map((tag) => (
                          <span key={tag} style={styles.tag}>#{tag}</span>
                        ))}
                      </div>
                    )}

                    <button
                      style={styles.joinBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/room/${room.id}`;
                      }}
                    >
                      Join Room →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* FAB */}
      <button
        style={styles.fab}
        onClick={() => { setShowCreate(true); setShowJoin(false); }}
        title="Start a room"
      >
        +
      </button>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b0b0f",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed",
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
    top: -100,
    left: -100,
    pointerEvents: "none",
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    width: 400,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
    bottom: -80,
    right: -80,
    pointerEvents: "none",
    zIndex: 0,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 28px",
    borderBottom: "1px solid #1a1a24",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "rgba(11,11,15,0.85)",
  },
  navLogo: { display: "flex", alignItems: "center", gap: 8 },
  logoIcon: { fontSize: 20 },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navUser: { display: "flex", alignItems: "center", gap: 10 },
  navName: { fontSize: 14, color: "#9ca3af" },
  avatar: { width: 36, height: 36, borderRadius: "50%", border: "2px solid #2d2d3d", objectFit: "cover" },

  main: { maxWidth: 1100, margin: "0 auto", padding: "40px 24px 100px", position: "relative", zIndex: 1 },

  hero: { marginBottom: 40 },
  greeting: { fontSize: 14, color: "#6b7280", marginBottom: 2, letterSpacing: 1 },
  heroTitle: { fontSize: 42, fontWeight: 800, letterSpacing: "-1px", margin: "0 0 8px" },
  heroSub: { fontSize: 15, color: "#6b7280", marginBottom: 24 },
  heroActions: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 },

  btnPrimary: {
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "opacity 0.2s",
  },
  btnSecondary: {
    background: "transparent",
    color: "#d1d5db",
    border: "1px solid #2d2d3d",
    padding: "12px 22px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  btnGreen: {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  btnGhost: {
    background: "transparent",
    color: "#6b7280",
    border: "1px solid #2d2d3d",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: 14,
    cursor: "pointer",
  },

  inlinePanel: {
    background: "#13131c",
    border: "1px solid #1f1f2e",
    borderRadius: 14,
    padding: "16px 20px",
    marginTop: 12,
    maxWidth: 520,
  },
  panelLabel: { fontSize: 12, color: "#6b7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 },
  inputRow: { display: "flex", gap: 8 },
  input: {
    flex: 1,
    background: "#0f0f18",
    border: "1px solid #2d2d3d",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
  },

  categories: { display: "flex", gap: 8, marginBottom: 32, overflowX: "auto", paddingBottom: 4 },
  catActive: {
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "8px 18px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  catInactive: {
    background: "transparent",
    color: "#6b7280",
    border: "1px solid #1f1f2e",
    padding: "8px 18px",
    borderRadius: 999,
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", gap: 10 },
  liveDot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#ef4444",
    boxShadow: "0 0 6px #ef4444",
    animation: "pulse 1.5s infinite",
  },
  roomCount: { fontSize: 13, color: "#4b5563", background: "#13131c", padding: "4px 12px", borderRadius: 999 },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#111118",
    border: "1px solid #1f1f2e",
    borderRadius: 16,
    padding: "20px",
    cursor: "pointer",
    transition: "border-color 0.2s, transform 0.2s",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardIcon: { fontSize: 22 },
  liveTag: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#ef4444",
    background: "rgba(239,68,68,0.1)",
    padding: "3px 8px",
    borderRadius: 999,
  },
  cardTitle: { fontSize: 16, fontWeight: 700, marginBottom: 4 },
  cardId: { fontSize: 12, color: "#4b5563", marginBottom: 12 },
  tags: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
  tag: { fontSize: 11, color: "#6b7280", background: "#1a1a24", padding: "3px 8px", borderRadius: 6 },
  joinBtn: {
    width: "100%",
    background: "rgba(124,58,237,0.15)",
    color: "#a78bfa",
    border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 10,
    padding: "10px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s",
  },

  emptyState: {
    textAlign: "center",
    color: "#4b5563",
    padding: "60px 0",
    fontSize: 15,
  },

  fab: {
    position: "fixed",
    bottom: 28,
    right: 28,
    width: 52,
    height: 52,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    color: "#fff",
    fontSize: 26,
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
  },
};