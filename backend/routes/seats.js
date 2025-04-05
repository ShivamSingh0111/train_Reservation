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

// Initialize seats
router.post('/init', async (req, res) => {
    try {
        // Check if seats already exist
        const existingSeats = await Seat.countDocuments();
        if (existingSeats > 0) {
            return res.status(400).json({ msg: 'Seats are already initialized' });
        }

        const seats = [];
        for (let i = 1; i <= 40; i++) {
            seats.push({ seatNumber: `S${i}` });
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
