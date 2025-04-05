const express = require('express');
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const router = express.Router();

// Book a seat
router.post('/', auth, async (req, res) => {
    const { seatNumber } = req.body;

    try {
        // Find the seat
        const seat = await Seat.findOne({ seatNumber });

        if (!seat) {
            return res.status(404).json({ msg: 'Seat not found' });
        }

        if (seat.isBooked) {
            return res.status(400).json({ msg: `Seat ${seatNumber} is already booked` });
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

        res.json({ msg: `Seat ${seatNumber} booked successfully`, booking });
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
