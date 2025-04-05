import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import TrainIcon from '@mui/icons-material/Train';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import HistoryIcon from '@mui/icons-material/History';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.name}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your train reservations and bookings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrainIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Book a Seat
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Reserve your seat on the next available train. Choose from various classes and seating options.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => navigate('/book-seats')}
              >
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventSeatIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  View Available Seats
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Check seat availability and choose your preferred seat for upcoming journeys.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => navigate('/book-seats')}
              >
                View Seats
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  My Bookings
                </Typography>
              </Box>
              <Typography color="text.secondary">
                View your booking history, manage existing reservations, and check upcoming journeys.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => navigate('/my-bookings')}
              >
                View Bookings
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 