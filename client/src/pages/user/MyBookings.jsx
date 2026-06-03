import { useState, useEffect } from "react";
import API from "../../utils/api";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  const fetchBookings = async () => {
    const { data } = await API.get("/api/bookings/my");
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    setCancelling(id);
    try {
      await API.put(`/api/bookings/${id}/cancel`, { reason: "Cancelled by user" });
      fetchBookings();
    } catch (err) {
      alert("Failed to cancel");
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
        <p className="text-gray-500 mb-8">Track all your workspace reservations</p>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{b.space?.name || "Space"}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[b.status]}`}>{b.status}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-500">
                      <span>📅 {new Date(b.startDate).toLocaleDateString()}</span>
                      <span>🔄 {b.bookingType}</span>
                      <span>👥 {b.teamSize} person(s)</span>
                      <span>📍 {b.space?.location?.city}</span>
                    </div>
                    {b.specialRequirements && (
                      <p className="text-sm text-gray-400 mt-2">Note: {b.specialRequirements}</p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-indigo-600">₹{b.totalAmount}</div>
                    <div className={`text-xs mt-1 ${b.paymentStatus === "paid" ? "text-green-600" : "text-yellow-600"}`}>
                      {b.paymentStatus}
                    </div>
                    {b.status === "pending" && (
                      <button onClick={() => handleCancel(b._id)} disabled={cancelling === b._id}
                        className="mt-3 text-xs text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition disabled:opacity-50">
                        {cancelling === b._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
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

export default MyBookings;
