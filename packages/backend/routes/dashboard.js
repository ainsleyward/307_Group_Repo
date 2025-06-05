// routes/dashboard.js
import express from "express";
import User from "../models/User.js";
import Dog from "../models/Dog.js";
import { authenticateUser } from "../auth.js"

const router = express.Router();

router.get("/:userId", authenticateUser, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDogId = req.query.dogId;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (!user.dogs || user.dogs.length === 0) {
      return res.status(200).json({
        userName: user.firstName,
        currentDog: null,
        matches: [],
        noDogs: true,
      });
    }

    const currentDog = currentDogId
      ? await Dog.findById(currentDogId)
      : await Dog.findById(user.dogs[0]);

    if (!currentDog)
      return res.status(404).json({ error: "Current dog not found" });

    const otherDogs = await Dog.find({
      _id: { $ne: currentDog._id },
      owner: { $ne: user._id },
    }).populate("owner");

    const normalize = (str) => str?.toLowerCase().trim();
    const locationMatches = otherDogs
      .filter((dog) => normalize(dog.owner?.city) === normalize(user.city))
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    res.status(200).json({
      userName: user.firstName,
      currentDog,
      matches: locationMatches,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
