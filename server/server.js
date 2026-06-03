const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }
});

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("joinSpace", (spaceId) => { socket.join(spaceId); });
  socket.on("disconnect", () => { console.log("Client disconnected:", socket.id); });
});

app.use((req, res, next) => { req.io = io; next(); });

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/spaces", require("./routes/spaceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/amenities", require("./routes/amenityRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.get("/", (req, res) => { res.send("CoWorking Space API is running..."); });
app.use((req, res) => { res.status(404).json({ message: "Route not found" }); });
app.use((err, req, res, next) => { res.status(500).json({ message: "Server Error", error: err.message }); });

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
