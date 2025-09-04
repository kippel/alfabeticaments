# GEMINI Project Overview: Alfabeticaments

This document provides a comprehensive overview of the Alfabeticaments project, designed to be used as a context for AI-powered development tools like Gemini.

## Project Overview

Alfabeticaments is a full-stack web application with a clear separation between its backend and frontend.

*   **Backend:** The backend is a Python application built with the **FastAPI** framework. It serves a RESTful API and connects to a **MongoDB** database for data persistence. Asynchronous operations are handled using `motor`. Authentication is managed with `passlib` for password hashing and `python-jose` for JWT.

*   **Frontend:** The frontend is a **Next.js** application written in **TypeScript**. It utilizes **React** and a modern UI toolkit, including:
    *   **Radix UI:** For building accessible and unstyled UI components.
    *   **Tailwind CSS:** For utility-first styling.
    *   **next-auth:** For handling user authentication on the client-side.
    *   **next-intl:** For internationalization (i18n).

*   **Containerization:** The entire application is containerized using **Docker** and orchestrated with **Docker Compose**. This ensures a consistent development and deployment environment.

## Building and Running

The primary way to build and run this project is through Docker.

### Development Environment

To start the development environment, run the following command from the project root:

```bash
docker-compose up --build
```

This will:

1.  Build the backend Docker image.
2.  Start the backend and MongoDB containers.
3.  The frontend is managed separately using `npm`.

### Running Tests

The backend has a suite of tests that can be run with the following command:

```bash
docker-compose exec backend pytest -v
```

### Running CLI Commands

The backend has a command-line interface (CLI) that can be accessed with:

```bash
docker-compose exec backend python -m app.cli
```

## Development Conventions

### Backend

*   **Framework:** FastAPI is the core of the backend. New endpoints and features should follow FastAPI's conventions.
*   **Database:** All database interactions should be performed asynchronously using `motor`.
*   **Testing:** `pytest` is the testing framework. New code should be accompanied by corresponding tests.
*   **Dependencies:** Backend dependencies are managed with `uv` and are listed in `pyproject.toml`.

### Frontend

*   **Framework:** The frontend is built with Next.js and React.
*   **Styling:** Styling is done with Tailwind CSS.
*   **Components:** Reusable UI components are built using Radix UI.
*   **Authentication:** Client-side authentication is handled by `next-auth`.
*   **Dependencies:** Frontend dependencies are managed with `npm` and are listed in `frontend/package.json`.
