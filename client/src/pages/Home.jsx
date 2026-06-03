import { Link } from "react-router-dom";

const features = [
  { icon: "⚡", title: "Real-Time Availability", desc: "See live desk and room availability powered by Socket.io" },
  { icon: "📅", title: "Easy Booking", desc: "Book by hour, day, or month with instant confirmation" },
  { icon: "🏢", title: "Premium Spaces", desc: "Private cabins, shared desks, hot desks & meeting rooms" },
  { icon: "📊", title: "Smart Analytics", desc: "Track usage, spending and bookings from your dashboard" },
  { icon: "🔔", title: "Notifications", desc: "Real-time alerts for bookings, updates and reminders" },
  { icon: "🔒", title: "Secure Access", desc: "JWT authentication with role-based access control" },
];

const spaceTypes = [
  { type: "Shared Desk", price: "₹500/day", icon: "🖥️", color: "bg-blue-50 border-blue-200" },
  { type: "Private Cabin", price: "₹2500/day", icon: "🏠", color: "bg-purple-50 border-purple-200" },
  { type: "Meeting Room", price: "₹800/hr", icon: "👥", color: "bg-green-50 border-green-200" },
  { type: "Hot Desk", price: "₹700/day", icon: "⚡", color: "bg-orange-50 border-orange-200" },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-white/20 rounded-full px-4 py-1 text-sm font-medium mb-6">
            🚀 Smart Co-Working Space Management
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect<br />
            <span className="text-yellow-300">Work Space</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Book desks, cabins and meeting rooms in real-time. Modern spaces built for productivity and collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/spaces" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 hover:text-indigo-700 transition shadow-lg">
              Browse Spaces →
            </Link>
            <Link to="/register" className="bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition">
              Get Started Free
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-10 text-center">
            {[["500+","Members"],["50+","Spaces"],["4.8★","Rating"]].map(([val,label]) => (
              <div key={label}>
                <div className="text-3xl font-bold">{val}</div>
                <div className="text-indigo-200 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Space Types */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Space Types</h2>
          <p className="text-center text-gray-500 mb-10">Choose what fits your work style</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {spaceTypes.map((s) => (
              <Link to="/spaces" key={s.type} className={`border-2 ${s.color} rounded-2xl p-6 text-center hover:shadow-lg transition cursor-pointer`}>
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="font-bold text-gray-800">{s.type}</div>
                <div className="text-indigo-600 font-semibold mt-1">{s.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Why CoWorkSpace?</h2>
          <p className="text-center text-gray-500 mb-10">Everything you need to work smarter</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-200 mb-8">Join hundreds of professionals already using CoWorkSpace</p>
          <Link to="/register" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg inline-block">
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm">
        © 2025 CoWorkSpace. Built with MERN Stack + Socket.io
      </footer>
    </div>
  );
};

export default Home;
