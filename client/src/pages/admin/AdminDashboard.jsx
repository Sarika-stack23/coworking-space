import { useState, useEffect } from "react";
import API from "../../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, u, sp, b] = await Promise.all([
          API.get("/api/admin/stats"),
          API.get("/api/admin/users"),
          API.get("/api/spaces"),
          API.get("/api/bookings/all"),
        ]);
        setStats(s.data); setUsers(u.data); setSpaces(sp.data); setBookings(b.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const handleVerify = async (id) => {
    await API.put(`/api/admin/spaces/${id}/verify`);
    setSpaces(spaces.map(s => s._id === id ? {...s, isVerified: true} : s));
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/api/admin/users/${id}`);
    setUsers(users.filter(u => u._id !== id));
  };

  const tabs = ["overview","users","spaces","bookings"];

  if (loading) return <div className="text-center py-20 text-gray-400">Loading admin data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your co-working platform</p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Users", value: stats.totalUsers, icon: "👤", color: "bg-blue-50 text-blue-600" },
              { label: "Total Spaces", value: stats.totalSpaces, icon: "🏢", color: "bg-purple-50 text-purple-600" },
              { label: "Total Bookings", value: stats.totalBookings, icon: "📅", color: "bg-green-50 text-green-600" },
              { label: "Revenue", value: `₹${stats.totalRevenue}`, icon: "💰", color: "bg-yellow-50 text-yellow-600" },
            ].map((s) => (
              <div key={s.label} className={`${s.color} rounded-2xl p-5`}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-xl p-1 shadow-sm w-fit">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${tab === t ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-indigo-600"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">All Users ({users.length})</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>{["Name","Email","Role","Company","Action"].map(h => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-gray-500">{u.email}</td>
                      <td className="px-4 py-3"><span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs capitalize">{u.role}</span></td>
                      <td className="px-4 py-3 text-gray-500">{u.company || "-"}</td>
                      <td className="px-4 py-3">
                        {u.role !== "admin" && (
                          <button onClick={() => handleDeleteUser(u._id)} className="text-red-500 hover:text-red-700 text-xs">Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Spaces Tab */}
        {tab === "spaces" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">All Spaces ({spaces.length})</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>{["Name","Type","City","Capacity","Verified","Action"].map(h => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {spaces.map((s) => (
                    <tr key={s._id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="px-4 py-3 text-gray-500 capitalize">{s.type.replace("_"," ")}</td>
                      <td className="px-4 py-3 text-gray-500">{s.location?.city}</td>
                      <td className="px-4 py-3">{s.capacity}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${s.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {s.isVerified ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {!s.isVerified && (
                          <button onClick={() => handleVerify(s._id)} className="text-xs text-indigo-600 hover:underline">Verify</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {tab === "bookings" && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 font-semibold text-gray-700">All Bookings ({bookings.length})</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500">
                  <tr>{["User","Space","Type","Date","Amount","Status"].map(h => <th key={h} className="text-left px-4 py-3">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{b.user?.name}</td>
                      <td className="px-4 py-3 text-gray-500">{b.space?.name}</td>
                      <td className="px-4 py-3 capitalize">{b.bookingType}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(b.startDate).toLocaleDateString()}</td>
                      <td className="px-4 py-3 font-semibold">₹{b.totalAmount}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          b.status === "confirmed" ? "bg-green-100 text-green-700" :
                          b.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">Recent Bookings</h3>
              {bookings.slice(0,5).map((b) => (
                <div key={b._id} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="text-gray-700">{b.user?.name} → {b.space?.name}</span>
                  <span className="font-semibold text-indigo-600">₹{b.totalAmount}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4">Platform Summary</h3>
              {[
                ["Space Owners", stats?.totalOwners],
                ["Verified Spaces", stats?.verifiedSpaces],
                ["Confirmed Bookings", stats?.confirmedBookings],
                ["Pending Inquiries", stats?.pendingInquiries],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-bold text-gray-800">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
