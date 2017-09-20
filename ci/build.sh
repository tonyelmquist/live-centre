#!/bin/bash

set -e

echo "\nBuilding the app..."

cd ../www
npm install
npm run build
npm run deploy

echo "\nWell done! 🎉"
