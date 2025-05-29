// need to update routes. Make one for dogs separately, and use new config of cloudinary and already existing post /dog
// to upload image. NEED TO CHANGE DOG IMAGE SCHEMA TO INCLUDE PUBLIC ID.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Dog from "./models/Dog.js";
import Match from "./models/Match.js";
import dashboardRoutes from "./routes/dashboard.js";
import cloudinaryConfig from "./cloudinary.js";
const { cloudinary, upload } = cloudinaryConfig;

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
/*
const allowedOrigins = [
  "https://icy-island-011633b1e.6.azurestaticapps.net",
  "http://localhost:5173", // for local dev
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false,
};*/
//app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/dashboard", dashboardRoutes);

// GET dogs
app.get("/dogs", (req, res) => {
  Dog.find({})
    .then((dogs) => res.send(dogs))
    .catch((err) => res.status(500).send(err.message)); // server error
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    res.status(201).json({
      imgUrl: req.file.path,
      publicId: req.file.filename,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// internal API for image deletion
app.delete("/upload/:publicId", (req, res) => {
  cloudinary.uploader
    .destroy(req.params.publicId)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json(error));
});

// POST a new dog
app.post("/dogs", async (req, res) => {
  const newDog = new Dog(req.body);
  newDog
    .save()
    .then((dog) => res.status(201).json(dog))
    .catch((err) => res.status(400).send(err.message)); //client-side error
});

app.post("/matches", (req, res) => {
  const newMatch = new Match(req.body);
  newMatch
    .save()
    .then((match) => res.status(201).json(match))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/dev/clear-matches", async (req, res) => {
  try {
    await Match.deleteMany({});
    res.send("All matches deleted");
  } catch (err) {
    res.status(500).send("Error deleting matches");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.`);
});
