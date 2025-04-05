const express = require('express');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const router = express.Router();

// Book multiple seats
router.post('/', auth, async (req, res) => {
    const { seatNumbers } = req.body;

    if (!seatNumbers || !Array.isArray(seatNumbers) || seatNumbers.length === 0) {
        return res.status(400).json({ msg: 'Please provide an array of seat numbers' });
    }

    try {
        const bookingResults = [];
        const errorSeats = [];

        // Process each seat in a transaction
        for (const seatNumber of seatNumbers) {
            // Find the seat
            const seat = await Seat.findOne({ seatNumber });

            if (!seat) {
                errorSeats.push({ seatNumber, reason: 'not found' });
                continue;
            }

            if (seat.isBooked) {
                errorSeats.push({ seatNumber, reason: 'already booked' });
                continue;
            }

            // Book the seat
            seat.isBooked = true;
            await seat.save();

            // Save booking
            const booking = new Booking({
                user: req.user.id,
                seat: seat._id
            });

            await booking.save();
            bookingResults.push({ seatNumber, booking });
        }

        if (bookingResults.length === 0) {
            return res.status(400).json({ 
                msg: 'Failed to book any seats', 
                errors: errorSeats 
            });
        }

        // Return results
        res.json({ 
            msg: `Successfully booked ${bookingResults.length} seat(s)`, 
            bookings: bookingResults,
            failed: errorSeats.length > 0 ? errorSeats : undefined
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Get user bookings
router.get('/myBooking', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id}).populate('seat').populate({ 
            path: 'user', 
            select: 'name email' 
        });;
        res.json(bookings);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
