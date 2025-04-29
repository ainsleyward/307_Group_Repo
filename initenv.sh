#!/bin/bash

set -e

echo "Setting up backend..."
cd packages/backend
npm init -y
npm install express mongoose cors dotenv

echo "Setting up frontend..."
cd ..
cd frontend
npm install
