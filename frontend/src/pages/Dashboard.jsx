import React, { useState, useEffect } from 'react';
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
  CardMedia,
  Divider,
  Avatar,
  Chip,
  Stack,
  IconButton,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChairIcon from '@mui/icons-material/Chair';
import WindowIcon from '@mui/icons-material/Window';
import DateRangeIcon from '@mui/icons-material/DateRange';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    availableSeats: 0,
    windowSeats: 0,
    totalBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Fetch seat stats
      const seatsResponse = await axios.get('https://train-reservation-7aft.onrender.com/api/seats/stats');
      
      // Fetch user bookings count
      const bookingsResponse = await axios.get('https://train-reservation-7aft.onrender.com/api/bookings/myBooking');
      
      setStats({
        availableSeats: seatsResponse.data.available || 0,
        windowSeats: seatsResponse.data.window?.available || 0,
        totalBookings: bookingsResponse.data.length || 0
      });
      
      setLastRefreshed(new Date());
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Header Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 2,
          backgroundImage: 'linear-gradient(to right, #1976d2, #64b5f6)',
          color: 'white'
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DirectionsRailwayIcon sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h3" fontWeight="bold">
                Welcome, {user?.name}!
              </Typography>
            </Box>
            <Typography variant="subtitle1">
              Manage your train reservations and enjoy your travel experience
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'white',
                color: '#1976d2',
                display: 'inline-flex',
                fontSize: 40
              }}
            >
              {user?.name?.charAt(0) || <AccountCircleIcon fontSize="inherit" />}
            </Avatar>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="medium">
            Overview
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
              Last updated: {formatDate(lastRefreshed)}
            </Typography>
            <IconButton size="small" onClick={fetchStats} disabled={loading}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              {loading ? (
                <Skeleton variant="rectangular" height={100} />
              ) : (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Available Seats
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.availableSeats}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'primary.light' }}>
                      <ChairIcon />
                    </Avatar>
                  </Box>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.availableSeats > 40 ? 100 : (stats.availableSeats / 40) * 100} 
                      sx={{ height: 8, borderRadius: 4 }} 
                    />
                  </Box>
                </>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              {loading ? (
                <Skeleton variant="rectangular" height={100} />
              ) : (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Window Seats
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.windowSeats}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'info.light' }}>
                      <WindowIcon />
                    </Avatar>
                  </Box>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={stats.windowSeats > 13 ? 100 : (stats.windowSeats / 13) * 100} 
                      color="info"
                      sx={{ height: 8, borderRadius: 4 }} 
                    />
                  </Box>
                </>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              {loading ? (
                <Skeleton variant="rectangular" height={100} />
              ) : (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Your Bookings
                      </Typography>
                      <Typography variant="h3" fontWeight="bold">
                        {stats.totalBookings}
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'success.light' }}>
                      <HistoryIcon />
                    </Avatar>
                  </Box>
                  <Box sx={{ mt: 3, textAlign: 'right' }}>
                    <Button 
                      variant="text" 
                      color="primary" 
                      endIcon={<ArrowForwardIcon />} 
                      onClick={() => navigate('/my-bookings')}
                    >
                      View Details
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Quick Actions Section */}
      <Typography variant="h5" fontWeight="medium" sx={{ mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ 
              height: 140, 
              bgcolor: 'primary.light', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <TrainIcon sx={{ fontSize: 80, color: 'white' }} />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrainIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  Book a Seat
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Reserve your seat on the next available train. Choose from various seating options for a comfortable journey.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => navigate('/book-seats')}
                endIcon={<ArrowForwardIcon />}
              >
                Book Now
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ 
              height: 140, 
              bgcolor: 'info.light', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <EventSeatIcon sx={{ fontSize: 80, color: 'white' }} />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventSeatIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" component="h2">
                  View Available Seats
                </Typography>
              </Box>
              <Typography color="text.secondary">
                Check seat availability in real-time and choose your preferred window, middle, or aisle seat.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => navigate('/book-seats')}
                endIcon={<ArrowForwardIcon />}
              >
                View Seats
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ 
              height: 140, 
              bgcolor: 'success.light', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center' 
            }}>
              <HistoryIcon sx={{ fontSize: 80, color: 'white' }} />
            </Box>
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
            <CardActions sx={{ p: 2 }}>
              <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={() => navigate('/my-bookings')}
                endIcon={<ArrowForwardIcon />}
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