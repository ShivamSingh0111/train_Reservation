const express = require('express');
const Seat = require('../models/Seat');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all seats
router.get('/', async (req, res) => {
    try {
        const seats = await Seat.find();
        res.json(seats);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Get seat availability statistics
router.get('/stats', async (req, res) => {
    try {
        const totalSeats = await Seat.countDocuments();
        const bookedSeats = await Seat.countDocuments({ isBooked: true });
        const availableSeats = totalSeats - bookedSeats;
        
        // Get window seat stats
        const totalWindowSeats = await Seat.countDocuments({ isWindow: true });
        const availableWindowSeats = await Seat.countDocuments({ isWindow: true, isBooked: false });
        
        // Get position stats
        const availableUpperSeats = await Seat.countDocuments({ position: 'upper', isBooked: false });
        const availableMiddleSeats = await Seat.countDocuments({ position: 'middle', isBooked: false });
        const availableLowerSeats = await Seat.countDocuments({ position: 'lower', isBooked: false });
        
        res.json({
            total: totalSeats,
            booked: bookedSeats,
            available: availableSeats,
            window: {
                total: totalWindowSeats,
                available: availableWindowSeats
            },
            positions: {
                upper: availableUpperSeats,
                middle: availableMiddleSeats,
                lower: availableLowerSeats
            }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Initialize seats
router.post('/init', async (req, res) => {
    try {
        // Check if seats already exist
        const existingSeats = await Seat.countDocuments();
        if (existingSeats > 0) {
            return res.status(400).json({ msg: 'Seats are already initialized' });
        }

        const seats = [];
        
        // Initialize 40 seats with appropriate metadata
        for (let i = 1; i <= 40; i++) {
            // Determine position (lower, middle, upper)
            // We'll create a pattern where every 3 seats form a unit
            // Each unit has 1 lower, 1 middle, 1 upper
            const position = i % 3 === 1 ? 'lower' : i % 3 === 2 ? 'middle' : 'upper';
            
            // Create a more distinct pattern for window seats
            // Making window seats more predictable - every 3rd seat is a window seat
            const isWindow = i % 3 === 0;
            
            seats.push({ 
                seatNumber: `S${i}`,
                position,
                isWindow
            });
        }

        // Insert all seats at once
        await Seat.insertMany(seats);

        res.json({ msg: 'Seats initialized successfully' });
    } catch (err) {
        console.error(err); // Debugging
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;
