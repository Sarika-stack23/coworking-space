import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/bookings/my").then(({ data }) => { setBookings(data); setLoading(false); });
  }, []);

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: "📅", color: "bg-blue-50 text-blue-600" },
    { label: "Active", value: bookings.filter(b => b.status === "confirmed").length, icon: "✅", color: "bg-green-50 text-green-600" },
    { label: "Pending", value: bookings.filter(b => b.status === "pending").length, icon: "⏳", color: "bg-yellow-50 text-yellow-600" },
    { label: "Total Spent", value: `₹${bookings.reduce((s, b) => s + (b.totalAmount || 0), 0)}`, icon: "💰", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name?.split(" ")[0]}! 👋</h1>
            <p className="text-gray-500 mt-1">Here's your workspace overview</p>
          </div>
          <Link to="/spaces" className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition">
            + Book Space
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-5`}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm opacity-80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { to: "/spaces", icon: "🏢", label: "Browse Spaces" },
            { to: "/my-bookings", icon: "📋", label: "My Bookings" },
            { to: "/profile", icon: "👤", label: "My Profile" },
            { to: "/spaces", icon: "⚡", label: "Hot Desks" },
          ].map((item) => (
            <Link key={item.label} to={item.to}
              className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-gray-700">{item.label}</div>
            </Link>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
            <Link to="/my-bookings" className="text-indigo-600 text-sm hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📭</div>
              <p className="text-gray-500">No bookings yet</p>
              <Link to="/spaces" className="mt-3 inline-block text-indigo-600 font-medium hover:underline">Browse spaces →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b) => (
                <div key={b._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-800">{b.space?.name || "Space"}</div>
                    <div className="text-sm text-gray-500">{new Date(b.startDate).toLocaleDateString()} • {b.bookingType}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-700">₹{b.totalAmount}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
