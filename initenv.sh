#!/bin/bash

set -e

# navigate to backend and install
echo "Setting up backend..."
cd packages/backend
npm init -y
npm i

# navigate to frontend and install
echo "Setting up frontend..."./
cd ..
cd frontend
npm install
npm audit fix # automatically audit

cd ../.. # go back to root

# ensure .env exists and overwrite with temporary env file
my_path=./packages/backend/.env
touch $my_path
echo ""
echo "#######################################################################"
echo "Please put secrets in $my_path"
echo "#######################################################################"