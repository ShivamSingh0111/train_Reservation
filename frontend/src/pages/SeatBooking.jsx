import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import axios from 'axios';

const SeatBooking = () => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [initializingSeats, setInitializingSeats] = useState(false);
  const [initSuccess, setInitSuccess] = useState(false);

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      console.log("Fetching seats...");
      const response = await axios.get('http://localhost:5000/api/seats');
      console.log("Seats data:", response.data);
      setSeats(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching seats:", err);
      setError('Failed to fetch seats');
      setLoading(false);
    }
  };

  const initializeSeats = async () => {
    try {
      setInitializingSeats(true);
      const response = await axios.post('http://localhost:5000/api/seats/init');
      console.log("Initialization response:", response.data);
      setInitSuccess(true);
      // Fetch the newly initialized seats
      fetchSeats();
    } catch (err) {
      console.error("Error initializing seats:", err);
      setError(err.response?.data?.msg || 'Failed to initialize seats');
    } finally {
      setInitializingSeats(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeat(seat);
    }
  };

  const handleBooking = async () => {
    if (!selectedSeat) return;

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        seatNumber: selectedSeat.seatNumber,
      });
      
      console.log("Booking response:", response.data);
      setBookingSuccess(true);
      setSelectedSeat(null);
      fetchSeats(); // Refresh seat data
      
      // Redirect to my-bookings page after a short delay
      setTimeout(() => {
        navigate('/my-bookings');
      }, 1500);
      
    } catch (err) {
      console.error("Error booking seat:", err);
      setError(err.response?.data?.msg || 'Failed to book seat');
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
          Book Your Seat
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Select an available seat from the layout below
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {initSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Seats initialized successfully!
        </Alert>
      )}

      {bookingSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Seat booked successfully! Redirecting to My Bookings...
        </Alert>
      )}

      {seats.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            No seats available
          </Typography>
          <Typography color="text.secondary" paragraph>
            The seat system needs to be initialized before booking.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={initializeSeats}
            disabled={initializingSeats}
            sx={{ mt: 2 }}
          >
            {initializingSeats ? 'Initializing...' : 'Initialize Seats'}
          </Button>
        </Paper>
      ) : (
        <>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Train Seat Layout
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={1} justifyContent="center">
              {seats.map((seat) => (
                <Grid item key={seat._id}>
                  <Button
                    variant={seat.isBooked ? 'contained' : selectedSeat?._id === seat._id ? 'contained' : 'outlined'}
                    color={seat.isBooked ? 'error' : selectedSeat?._id === seat._id ? 'primary' : 'inherit'}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                    sx={{
                      minWidth: '60px',
                      height: '60px',
                      m: 0.5,
                    }}
                  >
                    {seat.seatNumber}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleBooking}
              disabled={!selectedSeat}
            >
              Book Selected Seat
            </Button>
          </Box>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant="outlined" color="inherit" disabled sx={{ minWidth: '40px' }} />
              <Typography>Available</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant="contained" color="error" disabled sx={{ minWidth: '40px' }} />
              <Typography>Booked</Typography>
            </Paper>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button variant="contained" color="primary" disabled sx={{ minWidth: '40px' }} />
              <Typography>Selected</Typography>
            </Paper>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SeatBooking;