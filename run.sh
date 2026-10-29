#!/usr/bin/env fish
cd ~/Coding/MC-Achivement-Tracker/backend
node server.js &
cd ../frontend
npm run dev &
