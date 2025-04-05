# Train Reservation System

A comprehensive full-stack application designed for managing train seat reservations efficiently. This system allows users to browse available trains, view seat layouts, make reservations, and manage their bookings through an intuitive interface.

The platform provides real-time seat availability updates, secure user authentication, and a streamlined booking process to enhance the overall user experience for train travelers.

## Deployment Links

- **Live Frontend**: [https://train-reservation-nine.vercel.app/](https://train-reservation-nine.vercel.app/)
- **Backend API**: [https://train-reservation-7aft.onrender.com](https://train-reservation-7aft.onrender.com)

## Project Structure

- **Frontend**: React application with Material UI components
- **Backend**: Node.js/Express API with MongoDB database

## Getting Started

### Prerequisites

- Node.js 
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd train-reservation-backend-full
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Configuration

1. Create a `.env` file in the backend directory with the following variables:
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/train-reservation
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Access the application at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features

- User authentication (signup, login)
- Seat reservation
- Booking management
- Interactive seat selection

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/seats` - Seat management
- `/api/bookings` - Booking operations

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- Material UI
- React Router
- Axios

