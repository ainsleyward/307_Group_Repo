import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

export function registerUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send("Bad request: Invalid input data.");
  }

  User.findOne({ email }).then((existingUser) => {
    if (existingUser) {
      return res.status(409).send("Email already in use");
    }

    let savedUser;

    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        return newUser.save();
      })
      .then((user) => {
        savedUser = user;
        return generateAccessToken(user._id);
      })
      .then((token) => {
        res.status(201).send({ token, userId: savedUser._id });
      })
      .catch((err) => {
        console.error("Signup error:", err);
        res.status(500).send("Error creating user");
      });
  });
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export function loginUser(req, res) {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(401).send("Unauthorized");
          }

          generateAccessToken(user._id).then((token) => {
            res.status(200).send({ token, userId: user._id });
          });
        })
        .catch(() => {
          res.status(500).send("Server error");
        });
    })
    .catch(() => {
      res.status(500).send("Server error");
    });
}
