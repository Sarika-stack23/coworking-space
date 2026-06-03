import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";

const typeColors = {
  private_cabin: "bg-purple-100 text-purple-700",
  shared_desk: "bg-blue-100 text-blue-700",
  meeting_room: "bg-green-100 text-green-700",
  hot_desk: "bg-orange-100 text-orange-700",
};

const Spaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "", city: "" });

  const fetchSpaces = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.city) params.append("city", filters.city);
      const { data } = await API.get(`/api/spaces?${params}`);
      setSpaces(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSpaces(); }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Browse Spaces</h1>
          <p className="text-gray-500 mt-1">Find the perfect workspace for you</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-wrap gap-4">
          <select value={filters.type} onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Types</option>
            <option value="shared_desk">Shared Desk</option>
            <option value="private_cabin">Private Cabin</option>
            <option value="meeting_room">Meeting Room</option>
            <option value="hot_desk">Hot Desk</option>
          </select>
          <input type="text" placeholder="Search by city..." value={filters.city}
            onChange={(e) => setFilters({...filters, city: e.target.value})}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button onClick={() => setFilters({ type: "", city: "" })}
            className="text-sm text-gray-500 hover:text-indigo-600 px-3 py-2">Clear Filters</button>
          <span className="ml-auto text-sm text-gray-500 self-center">{spaces.length} spaces found</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading spaces...</div>
        ) : spaces.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No spaces found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div key={space._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-40 flex items-center justify-center">
                  <span className="text-5xl">
                    {space.type === "private_cabin" ? "🏠" : space.type === "meeting_room" ? "👥" : space.type === "hot_desk" ? "⚡" : "🖥️"}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{space.name}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeColors[space.type]}`}>
                      {space.type.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{space.description}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <span>📍 {space.location?.city}</span>
                    <span>👥 {space.capacity} seats</span>
                    <span>⭐ {space.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-indigo-600 font-bold">₹{space.pricing?.perDay}</span>
                      <span className="text-gray-400 text-sm">/day</span>
                    </div>
                    <Link to={`/spaces/${space._id}`}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                      View & Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spaces;
