# Merizo

Merizo is a mobile app project with a React Native client and a FastAPI backend. The backend uses MongoDB for persistence and exposes authentication and user profile endpoints.

## Project structure

```text
Merizo/
├── backend/       FastAPI service
├── UI/            React Native Android and iOS app
└── docker-compose.yml
```

See [UI/README.md](UI/README.md) for mobile development details and [backend/README.md](backend/README.md) for backend setup and API notes.

## Requirements

- Node.js and npm
- Python 3.11 for running the backend locally, or Docker Desktop
- A MongoDB instance
- For Android: Android Studio, JDK 17, Android SDK Platform 34, and a device or emulator
- For iOS: macOS, Xcode, and CocoaPods

## Configure the backend

Create `backend/.env` from the example and set your MongoDB connection, database name, and a private JWT secret (at least 32 characters):

```powershell
Copy-Item backend/.env.example backend/.env
```

Keep this file private; it is excluded from Git. The backend README describes the API behavior and current authentication limitations.

## Run with Docker

With Docker Desktop running and `backend/.env` configured, run from the repository root:

```bash
docker compose up --build
```

The API is available at `http://localhost:8000`; interactive API documentation is at `http://localhost:8000/docs`. Stop the service with `docker compose down`.

## Run locally

Start the backend in one terminal (PowerShell):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env # configure values in .env
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

In another terminal, install and start the mobile app:

```bash
cd UI
npm install
npm start
```

Then use `npm run android` or `npm run ios` to launch the app on a configured device or simulator. Platform setup and API host configuration are described in [UI/README.md](UI/README.md).

## Available API endpoints

- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — sign in and receive a bearer token
- `GET /api/users/profile` — retrieve the authenticated user's profile
- `POST /api/users/update` — update the user's profile

## Mobile checks

From `UI/`, run the available TypeScript and lint checks:

```bash
npm run tsc
npm run lint
```
