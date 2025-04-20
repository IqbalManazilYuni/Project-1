require("dotenv").config();
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

// Konfigurasi CORS untuk keamanan
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Middleware untuk validasi data
server.use((req, res, next) => {
  if (req.method === "POST") {
    if (!req.body.name || !req.body.jenis || !req.body.hal) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }
  }
  next();
});

// Route dasar
server.get("/", (req, res) => {
  res.json({ message: "API Catatan Pasangan" });
});

server.use("/api", router); // Semua API di bawah /api

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
