// routes/dashboard.js
import express from "express";
import User from "../models/User.js";
import Dog from "../models/Dog.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const currentDogId = req.query.dogId;

  try {
    const user = await User.findById(userId).populate("dogs");
    if (!user) return res.status(404).json({ error: "User not found" });

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
    let locationMatches = otherDogs.filter(
      (dog) => normalize(dog.owner?.city) === normalize(user.city),
    );
    locationMatches = locationMatches.sort(() => 0.5 - Math.random());

    const matches = locationMatches.slice(0, 3);

    res.json({
      userName: user.firstName,
      currentDog,
      matches,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
