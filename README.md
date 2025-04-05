# Train Reservation System

A comprehensive full-stack application designed for managing train seat reservations efficiently. This system allows users to browse available trains, view seat layouts, make reservations, and manage their bookings through an intuitive interface.

The platform provides real-time seat availability updates, secure user authentication, and a streamlined booking process to enhance the overall user experience for train travelers.

## Deployment Links

- **Live Frontend**: [https://train-reservation-nine.vercel.app/](https://train-reservation-nine.vercel.app/)
- **Backend API**: [https://train-reservation-7aft.onrender.com](https://train-reservation-7aft.onrender.com)

## Project Structure

- **Frontend**: React application with Material UI components
- **Backend**: Node.js/Express API with MongoDB database

## Features

### User Authentication
- Secure login and registration with JWT
- Password visibility toggle for better user experience
- User profile management

### Seat Management
- Interactive seat layout visualization
- Multiple seat selection capability
- Real-time seat availability updates
- Seat filtering by type (window, middle, upper, lower)
- Visual indicators for different seat types (window, position)

### Dashboard
- Modern UI with responsive design
- Real-time statistics (available seats, window seats, bookings)
- Quick access cards with intuitive navigation
- User profile overview
- Last-updated timestamps with refresh functionality

### Booking System
- Multi-seat booking in a single transaction
- Booking history and management
- Detailed seat information display

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

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user information

### Seats
- `GET /api/seats` - Get all seats
- `GET /api/seats/stats` - Get seat availability statistics
- `POST /api/seats/init` - Initialize seats (admin only)

### Bookings
- `POST /api/bookings` - Book multiple seats
- `GET /api/bookings/myBooking` - Get user's bookings

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- dotenv for environment variables
- Cors for cross-origin resource sharing

### Frontend
- React 18
- Material UI v5 for modern UI components
- React Router v6 for navigation
- Axios for API requests
- Context API for state management
- Custom hooks for auth and data fetching

## UI Screenshots

### Dashboard
The dashboard provides a quick overview of the system with statistics and quick actions.

### Seat Booking
The seat booking page shows an interactive seat layout with filtering options.

### User Authentication
Clean and user-friendly login/registration forms with password visibility toggle.

## Future Enhancements

- Seat cancellation functionality
- Admin dashboard for system management
- Email notifications for bookings
- Mobile app version
- Payment integration

## License

MIT

