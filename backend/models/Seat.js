const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
    seatNumber: { type: String, required: true, unique: true },
    isBooked: { type: Boolean, default: false },
    isWindow: { type: Boolean, default: false },
    position: { type: String, enum: ['lower', 'middle', 'upper'], default: 'lower' }
});

module.exports = mongoose.model('Seat', SeatSchema);
