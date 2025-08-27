# TravelMate+ (MERN + Bootstrap)

Full-stack travel bucket list with wishlist sharing, budget tracker, and travel journal.

## Folders
- `server/` — Node + Express + MongoDB API (JWT auth)
- `client/` — React + Bootstrap UI

## Quick Start

### 1) Backend
```bash
cd server
cp .env.example .env
# edit .env with your Mongo URI and JWT_SECRET
npm install
npm run dev
```
Server runs at `http://localhost:5000`

### 2) Frontend
```bash
cd ../client
# If you created using CRA scripts included here, ensure react-scripts installed
npm install react-scripts --save
npm install
# set API URL if needed
# echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```
App at `http://localhost:3000`

## Features
- Register/Login (JWT)
- Add/Edit/Delete destinations
- Mark visited with notes & actual spend
- Budget summary (planned vs actual)
- Public share link (read-only) `/share/:shareId`
