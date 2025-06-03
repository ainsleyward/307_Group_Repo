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

app.post("/matches", async (req, res) => {
  const { swiperDogId, targetDogId } = req.body;

  if (!swiperDogId) {
    return res.status(400).json({
      error: "missing swiperDogId",
    });
  }

  if (!targetDogId) {
    return res.status(400).json({
      error: "missing targetDogId",
    });
  }

  try {
    const newMatch = await Match.create({ swiperDogId, targetDogId });
    const isMatch = await Match.findOne({
      swiperDogId: targetDogId,
      targetDogId: swiperDogId,
    });
    res.status(201).json({
      matchId: newMatch._id,
      isMutualMatch: Boolean(isMatch),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/matches", async (req, res) => {
  const { swiperDogId } = req.query;
  if (!swiperDogId) {
    return res.status(400).json({ error: "missing swiperDogId" });
  }
  try {
    const matches = await Match.find({ swiperDogId });
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ error: "error getting matches" });
  }
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/dev/clear-matches", async (req, res) => {
  try {
    await Match.deleteMany({});
    res.send("all matches deleted");
  } catch (err) {
    res.status(500).send({ error: "error deleting matches" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.`);
});
