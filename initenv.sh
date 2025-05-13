#!/bin/bash

set -e

# navigate to backend and install
echo "Setting up backend..."
cd packages/backend
npm init -y
npm install express mongoose cors dotenv cloudinary

# navigate to frontend and install
echo "Setting up frontend..."./
cd ..
cd frontend
npm install
npm i react-router-dom @cloudinary/url-gen
npm audit fix # automatically audit

cd ../.. # go back to root

# ensure .env exists and overwrite with temporary env file
echo "MONGO_URI=mongodb+srv://katieslobodsky:o1RUwQ0J0A49q0tI@woofer.iju6doq.mongodb.net/Woofer
PORT=8000" > ./packages/backend/.env