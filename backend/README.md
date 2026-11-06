# Backend

## Run locally

Install the packages into the backend virtual environment and configure `backend/.env`:

```powershell
cd backend
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env # only when .env does not already exist
```

Set `MONGODB_URL`, `MONGODB_DATABASE`, and a private `JWT_SECRET` with at least 32 characters in `.env`. Keep `.env` out of source control. Start the API with:

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API provides `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/users/profile`, and `POST /api/users/update`. Registration creates an active account; email OTP verification is not configured. Login returns a seven-day bearer token. The forgot-password and OTP screens still need an email delivery service before those flows can work.

## Run with Docker

With Docker Desktop running and `backend/.env` configured, start the API from the project root:

```powershell
docker compose up --build backend
```

The API is available at `http://localhost:8000` (Swagger UI: `http://localhost:8000/docs`). The Compose service reads settings from `backend/.env`; the Docker build excludes that file. Stop it with `docker compose down`.
