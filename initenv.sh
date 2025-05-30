#!/bin/bash

npm ci

# ensure .env exists and overwrite with temporary env file
my_path=./packages/backend/.env
touch $my_path
echo ""
echo "#######################################################################"
echo "Please put secrets in $my_path"
echo "#######################################################################"