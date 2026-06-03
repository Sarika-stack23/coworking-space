import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const SpaceDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ bookingType: "daily", startDate: "", endDate: "", teamSize: 1, specialRequirements: "" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/api/spaces/${id}`).then(({ data }) => { setSpace(data); setLoading(false); });
  }, [id]);

  const calcAmount = () => {
    if (!space) return 0;
    if (booking.bookingType === "hourly") return space.pricing.perHour;
    if (booking.bookingType === "daily") return space.pricing.perDay;
    return space.pricing.perMonth;
  };

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    setBookingLoading(true);
    setError("");
    try {
      await API.post("/api/bookings", { spaceId: id, ...booking, totalAmount: calcAmount() });
      setSuccess("🎉 Booking confirmed! Check your dashboard.");
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;
  if (!space) return <div className="text-center py-20 text-gray-400">Space not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Space Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl h-64 flex items-center justify-center">
              <span className="text-8xl">
                {space.type === "private_cabin" ? "🏠" : space.type === "meeting_room" ? "👥" : space.type === "hot_desk" ? "⚡" : "🖥️"}
              </span>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-2xl font-bold text-gray-800">{space.name}</h1>
                {space.isVerified && <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">✓ Verified</span>}
              </div>
              <p className="text-gray-600 mb-4">{space.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  ["📍", "Location", space.location?.city],
                  ["👥", "Capacity", `${space.capacity} seats`],
                  ["📐", "Area", `${space.areaSize} sq ft`],
                  ["⭐", "Rating", `${space.rating}/5`],
                ].map(([icon, label, value]) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-xl mb-1">{icon}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="font-semibold text-gray-800 text-sm">{value}</div>
                  </div>
                ))}
              </div>
              {space.amenities?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {space.amenities.map((a) => (
                      <span key={a} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full">{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                {[["perHour","Per Hour"],["perDay","Per Day"],["perMonth","Per Month"]].map(([key, label]) => (
                  <div key={key} className="bg-indigo-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-600">₹{space.pricing?.[key]}</div>
                    <div className="text-xs text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Book This Space</h2>
              {success && <div className="bg-green-50 text-green-700 rounded-lg p-3 mb-4 text-sm">{success}</div>}
              {error && <div className="bg-red-50 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}
              <form onSubmit={handleBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Type</label>
                  <select value={booking.bookingType} onChange={(e) => setBooking({...booking, bookingType: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="date" required value={booking.startDate}
                    onChange={(e) => setBooking({...booking, startDate: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="date" required value={booking.endDate}
                    onChange={(e) => setBooking({...booking, endDate: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <input type="number" min="1" max={space.capacity} value={booking.teamSize}
                    onChange={(e) => setBooking({...booking, teamSize: parseInt(e.target.value)})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                  <textarea value={booking.specialRequirements}
                    onChange={(e) => setBooking({...booking, specialRequirements: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={2} placeholder="Any special requests..." />
                </div>
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-bold text-indigo-600 text-lg">₹{calcAmount()}</span>
                  </div>
                </div>
                <button type="submit" disabled={bookingLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
                  {bookingLoading ? "Booking..." : user ? "Confirm Booking" : "Login to Book"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetail;
