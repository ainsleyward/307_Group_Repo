// need to update routes. Make one for dogs separately, and use new config of cloudinary and already existing post /dog
// to upload image. NEED TO CHANGE DOG IMAGE SCHEMA TO INCLUDE PUBLIC ID.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Dog from "./models/Dog.js";
import Match from "./models/Match.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
const port = 8000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

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

// POST a new dog
app.post("/dogs", (req, res) => {
    const newDog = new Dog(req.body);
    newDog.save()
      .then((dog) => res.status(201).json(dog))
      .catch((err) => res.status(400).send(err.message)); //client-side error
});



app.post("/matches", (req, res) => {
  const newMatch = new Match(req.body);
  newMatch.save()
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

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
