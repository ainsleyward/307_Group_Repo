import express from "express";
import User from "../models/User.js";
import Dog from "../models/Dog.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const selectedDogId = req.query.dogId;

  try {
    const user = await User.findById(userId).populate("dogs");
    if (!user) return res.status(404).json({ error: "User not found" });

    const selectedDog = selectedDogId
      ? await Dog.findById(selectedDogId)
      : user.dogs[0];

    if (!selectedDog) return res.status(404).json({ error: "Selected dog not found" });

    const matches = await Dog.find({
      _id: { $ne: selectedDog._id },
      owner: { $ne: user._id },
      tags: { $in: selectedDog.tags }
    }).limit(3);

    res.json({
      userName: user.firstName,
      selectedDog,
      matches
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
