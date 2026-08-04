# Smart Task Manager - Frontend

React.js frontend for the **Smart Task Management and Productivity Tracker** application.

## Tech Stack

- React 18
- Vite
- React Router
- Axios
- Lucide React (icons)
- React Hot Toast (notifications)

## Features

- User login and registration pages
- JWT-based session management
- Responsive dashboard with productivity statistics
- Create, edit, delete, and update tasks
- Filter tasks by status and search by title/description
- Task priority and status badges
- Due date tracking with overdue indicators
- Interactive UI with dark theme

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:8080`

## Setup

1. Install dependencies:

```bash
cd Frontend
npm install
```

2. Configure environment (optional):

```bash
cp .env.example .env
```

Default API URL: `http://localhost:8080/api`

3. Start the development server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Push to GitHub

This folder is designed as a standalone repository:

```bash
cd Frontend
git init
git add .
git commit -m "Initial commit: Smart Task Manager Frontend"
git remote add origin https://github.com/YOUR_USERNAME/smart-task-manager-frontend.git
git branch -M main
git push -u origin main
```

## Project Structure

```
Frontend/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── config/         # API configuration
│   ├── context/        # Auth context (JWT session)
│   ├── pages/          # Login, Register, Dashboard
│   ├── services/       # API service layer
│   ├── utils/          # Helpers and constants
│   ├── App.jsx         # Routes and protected routes
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Pages

| Route | Description |
|-------|-------------|
| `/login` | User login |
| `/register` | User registration |
| `/dashboard` | Main task management dashboard (protected) |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080/api` |

## License

Personal project - Avikaar SMT
