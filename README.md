# System Design Atlas

A guided learning site for software system design, from core concepts to low-level design, high-level design, and design patterns. It also includes five step-by-step projects so learners can practice what they study.

## Open the site

**Live site:** https://satyasai-vanapalli.github.io/System-Design/

The site is published with GitHub Pages. New changes pushed to `main` are built and published automatically.

## What is included

- A progressive system design roadmap with lessons and completion tracking
- Low-level design and high-level design concepts
- A catalog of design patterns
- Five guided projects with implementation steps
- A progress view; learning progress is saved in the current browser

## Run it locally

```powershell
cd frontend
npm ci
npm run dev
```

The course and project guides run in the browser. The repository also contains a Spring Boot and PostgreSQL backend for API-based features; GitHub Pages hosts the frontend only.

To run the full local stack, copy `.env.example` to `.env`, replace its placeholder secrets, then run `docker compose up --build` from the repository root.

## Publish

The workflow in `.github/workflows/deploy.yml` builds the frontend and publishes `frontend/dist` to GitHub Pages whenever code is pushed to `main`.
