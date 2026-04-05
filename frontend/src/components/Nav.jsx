import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full bg-[#0f0f0f] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <div className="text-2xl font-bold text-white tracking-wide">
        <span className="text-purple-500">Vibe</span>Talk
      </div>
      {/* CTA */}
      <div className="flex items-center gap-4">
        <Link to="/login" className=" bg-white text-pruple-600 px-4 py-2 rounded-lg transition">
          Login
        </Link>

        <Link to="/register" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
            Register
        </Link>
      </div>
    </nav>
  );
};

export default Nav;