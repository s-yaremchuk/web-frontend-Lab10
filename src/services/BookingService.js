const LOCAL_STORAGE_KEY = 'uz_bookings';

const BookingService = {
  // Читає всі бронювання з localStorage
  getBookings() {
    const bookings = localStorage.getItem(LOCAL_STORAGE_KEY);
    return bookings ? JSON.parse(bookings) : [];
  },

  // Зберігає нове бронювання
  saveBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...booking
    };
    bookings.push(newBooking);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    return newBooking;
  },

  // Повертає масив заброньованих місць для конкретного потяга та вагона
  getBookedSeats(trainId, wagonId) {
    const bookings = this.getBookings();
    // Фільтруємо бронювання за потягом та вагоном і збираємо всі заброньовані місця в один масив
    const trainBookings = bookings.filter(
      (b) => b.trainId.toString() === trainId.toString() && b.wagonId.toString() === wagonId.toString()
    );
    
    // Повертаємо плоский масив усіх заброньованих місць
    return trainBookings.reduce((allSeats, booking) => {
      return [...allSeats, ...booking.seats];
    }, []);
  },

  // Очищає всі бронювання
  clearBookings() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};

export default BookingService;
