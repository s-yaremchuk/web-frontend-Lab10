import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookings, setBookings] = useState([]);

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatNumber)) {
        return prev.filter((s) => s !== seatNumber);
      }
      return [...prev, seatNumber];
    });
  };

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const clearSelection = () => {
    setSelectedWagon(null);
    setSelectedSeats([]);
  };

  const value = {
    selectedTrain,
    setSelectedTrain,
    selectedWagon,
    setSelectedWagon,
    selectedSeats,
    setSelectedSeats,
    toggleSeat,
    bookings,
    addBooking,
    clearSelection,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export default BookingContext;
