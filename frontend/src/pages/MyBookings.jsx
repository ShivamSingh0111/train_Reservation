import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import axios from 'axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/myBooking');
      console.log("Booking data received:", response.data);
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  // Get current date to display if other date methods fail
  const getCurrentDate = () => {
    return new Date().toLocaleString();
  };

  // This function displays the booking date in a user-friendly format
  const getBookingDate = (booking) => {
    try {
      // Try bookedAt first (from schema)
      if (booking.bookedAt) {
        const date = new Date(booking.bookedAt);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString();
        }
      }
      
      // Try createdAt next (MongoDB might add this)
      if (booking.createdAt) {
        const date = new Date(booking.createdAt);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString();
        }
      }
      
      // If booking has _id, extract timestamp from MongoDB ObjectId
      if (booking._id) {
        // MongoDB ObjectIDs contain a timestamp in the first 4 bytes
        const timestamp = parseInt(booking._id.substring(0, 8), 16) * 1000;
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString() + " (from ID)";
        }
      }
      
      // If all else fails, show current date with note
      return getCurrentDate() + " (approximate)";
    } catch (error) {
      console.error("Error formatting date:", error);
      return getCurrentDate() + " (fallback)";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Bookings
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          View and manage your train seat bookings
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            You haven't made any bookings yet.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Seat Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Booking Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>{booking.seat.seatNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.seat.isBooked ? 'Booked' : 'Available'}
                      color={booking.seat.isBooked ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    {getBookingDate(booking)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default MyBookings;