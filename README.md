# MERN Chat App

A simple real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node) + Socket.IO for live messaging.

This project is structured as a monorepo with two separate apps:

- **server-app** — Backend REST API + WebSocket server (Node / Express / Socket.IO / MongoDB)
- **client-app** — Frontend SPA (React + Vite + Tailwind CSS)

---

## 🚀 Features

- User signup + login (JWT based authentication)
- Real-time online user status via Socket.IO
- Real-time messaging between users
- Profile update (avatar + bio) via Cloudinary
- Protected routes (auth middleware)
- Works with Vercel + Render deployment

---

## 📁 Project structure

```
MERN_Chat_App/
  ├─ client-app/         # React frontend
  ├─ server-app/         # Express backend + Socket.IO
  ├─ render.yaml         # Render deployment config (backend)
  └─ README.md           # This file
```

---

## 🧰 Prerequisites

- Node.js (>= 18)
- npm
- A MongoDB instance (MongoDB Atlas recommended)
- A Cloudinary account (optional, needed for profile pictures)

---

## 🛠️ Local Development Setup

### 1) Clone repository

```bash
git clone <your-repo-url>
cd MERN_Chat_App
```

### 2) Install dependencies

```bash
cd server-app
npm install

cd ../client-app
npm install
```

### 3) Configure environment variables

Create `.env` files for each app (do NOT commit these files).

#### server-app/.env

```env
MONGO_URI=your_mongodb_connection_string
PORT=4000
JWT_SECRET=some_strong_secret
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_CLOUD_NAME=...
```

#### client-app/.env

```env
VITE_BACKEND_URL=http://localhost:4000
```


### 4) Run the backend

```bash
cd server-app
npm run dev
```

Backend should start on `http://localhost:4000`.

### 5) Run the frontend

```bash
cd client-app
npm run dev
```

Frontend should start on `http://localhost:5173` (default Vite port).

---

## 🧪 Health Check (API)

To verify the backend is running, visit:

```
GET http://localhost:4000/api/status
```

A successful response should look like:

```json
{ "message": "Server is live" }
```

---

## 🧑‍💻 Available Scripts

### Frontend (client-app)

| Command | What it does |
|--------|--------------|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the production bundle (output: `dist/`) |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint checks |

### Backend (server-app)

| Command | What it does |
|--------|--------------|
| `npm run dev` | Starts server with Nodemon (auto-restarts on changes) |
| `npm start` | Starts server once for production |

---

## ✅ Deploying

### Backend (Render)

1) Push repo to GitHub.
2) Create a new Web Service in Render.
3) Connect the repo and set the `root` to `server-app`.
4) Use `npm install` as the build command and `npm start` as the start command.
5) Add environment variables (as defined above).

### Frontend (Vercel)

1) Create a new Vercel project from the repo.
2) Set root directory to `client-app`.
3) Add `VITE_BACKEND_URL` environment variable pointing to your Render backend URL.
4) Deploy.

---

## 🔐 Notes / Best Practices

- Do **not** commit `.env` files.
- Rotate tokens / secrets before deploying to production.
- Keep `JWT_SECRET` strong and unique.

---

## 🎓 Learning Notes (for beginners)

- Authentication uses **JWT** stored in localStorage and sent via Axios header.
- Socket communication is handled via **Socket.IO** using `userId` in the query string.
- Protected routes are enforced by middleware (`protectRoute`) which validates the JWT.
- Images are uploaded to Cloudinary and saved as URLs in MongoDB.

---

If you want a quick “dev checklist” or a deploy-ready checklist file, tell me and I’ll add it too.

