# CursorMercury

A modern Vue.js demo application showcasing:
- Vue 3 with TypeScript
- External API integration (JSONPlaceholder)
- Local API with Express
- Modern UI with Tailwind CSS
- Component-based architecture

## Features

1. Task Manager
   - Add, complete, and delete tasks
   - Local API integration
   - Real-time updates

2. Posts List
   - Fetch posts from JSONPlaceholder API
   - Create new posts
   - Loading and error states
   - Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Quick Start

### Windows
1. Clone the repository:
```bash
git clone <repository-url>
cd vue-demo
```

2. Run the setup script:
```bash
.\setup.ps1
```

### Manual Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

## Running the Application

1. Start the backend server:
```powershell
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```powershell
npm run dev
```

3. Open http://localhost:5173 in your browser

## Project Structure

```
.
├── backend/              # Express.js backend
│   ├── server.js        # API server
│   └── package.json     # Backend dependencies
├── src/                 # Vue frontend
│   ├── components/      # Vue components
│   ├── services/        # API services
│   └── App.vue         # Main application
├── setup.ps1           # Windows setup script
└── package.json        # Frontend dependencies
```

## Development Tips

- The backend server runs on http://localhost:3000
- The frontend development server runs on http://localhost:5173
- Hot Module Replacement (HMR) is enabled for fast development
- API endpoints are documented in the backend/server.js file

## Technologies Used

- Vue 3
- TypeScript
- Express.js
- Tailwind CSS
- Axios
- Vite

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 