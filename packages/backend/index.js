// need to update routes. Make one for dogs separately, and use new config of cloudinary and already existing post /dog
// to upload image. NEED TO CHANGE DOG IMAGE SCHEMA TO INCLUDE PUBLIC ID.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Dog from "./models/Dog.js";
import Match from "./models/Match.js";
import User from "./models/User.js";
import Convo from "./models/Convo.js";
import Participant from "./models/Participant.js";
import Message from "./models/Message.js";
import dashboardRoutes from "./routes/dashboard.js";
import cloudinaryConfig from "./cloudinary.js";
import { registerUser, loginUser, authenticateUser } from "./auth.js";
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/dashboard", authenticateUser, dashboardRoutes);

// Signup
app.post("/signup", registerUser);

// Login
app.post("/login", loginUser);

// GET dogs
app.get("/dogs", (req, res) => {
  Dog.find({})
    .then((dogs) => res.send(dogs))
    .catch((err) => res.status(500).send(err.message)); // server error
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/dogs/:id", async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ error: "Dog not found" });
    res.json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
  try {
    if (!swiperDogId) {
      const matches = await Match.find();
      res.status(200).json(matches);
    } else {
      const matches = await Match.find({ swiperDogId });
      res.status(200).json(matches);
    }
  } catch (err) {
    res.status(500).json({ error: "error getting matches" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/matches/all", async (req, res) => {
  Match.find({})
    .then((matches) => res.send(matches))
    .catch((err) => res.status(500).send(err.message));
});

app.delete("/dev/clear-matches", async (req, res) => {
  try {
    await Match.deleteMany({});
    res.send("all matches deleted");
  } catch (err) {
    res.status(500).send({ error: "error deleting matches" });
  }
});

app.get("/convos", async (req, res) => {
  const { dogId } = req.query;
  if (!dogId) {
    return res.status(400).json({ error: "no dogId given" });
  }
  try {
    const participants = await Participant.find({ dogId });
    const convoIds = participants.map((x) => x.convoId);

    res.status(200).json({ convoIds });
  } catch (err) {
    console.error("error fetching convos:", err);
    res.status(500).json({ error: "server error" });
  }
});

app.post("/convos", async (req, res) => {
  const { dogId1, dogId2 } = req.body;
  if (!dogId1 || !dogId2) {
    return res.status(400).json({ error: "either dogId1 or dogId2 not given" });
  }

  try {
    const dog1Convos = await Participant.find({ dogId: dogId1 });
    const dog1ConvoIds = dog1Convos.map((x) => x.convoId);
    const dog2Convos = await Participant.find({
      dogId: dogId2,
      convoId: { $in: dog1ConvoIds },
    });

    if (dog2Convos.length > 0) {
      const existingConvoId = dog2Convos[0].convoId;
      return res.status(200).json({ convoId: existingConvoId });
    }

    const newConvo = await Convo.create({});
    await Participant.insertMany([
      { convoId: newConvo._id, dogId: dogId1 },
      { convoId: newConvo._id, dogId: dogId2 },
    ]);

    return res.status(201).json({ convoId: newConvo._id });
  } catch (err) {
    console.error("Error in find-or-create:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/messages", async (req, res) => {
  const { convoId } = req.query;

  if (!convoId) {
    return res.status(400).json({ error: "no convoId given" });
  }

  try {
    const messages = await Message.find({ convoId }).sort("date");
    res.json(messages);
  } catch (err) {
    console.error("error getting messages:", err);
    res.status(500).json({ error: "server error" });
  }
});

app.post("/messages", async (req, res) => {
  const { convoId, participantId, text } = req.body;

  if (!convoId || !participantId || !text) {
    return res.status(400).json({ error: "missing required arg" });
  }

  try {
    const message = await Message.create({
      convoId,
      participantId,
      text,
      date: Date.now(),
    });

    res.status(201).json(message);
  } catch (err) {
    console.error("error posting message:", err);
    res.status(500).json({ error: "failed to post message" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/dogs/:id", async (req, res) => {
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedDog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.`);
});
