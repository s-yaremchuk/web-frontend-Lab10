import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { trains } from '../data/trains';
import BookingService from '../services/BookingService';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import styles from './Booking.module.css';

const formatDateTime = (dateString) => {
  if (!dateString) return { date: '', time: '' };
  const date = new Date(dateString);
  const dateFormatted = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
  const timeFormatted = new Intl.DateTimeFormat('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
  return { date: dateFormatted, time: timeFormatted };
};

// Простий локальний Toast для ЛР15, який буде винесено в окремий компонент в ЛР16
function TempToast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.tempToast} ${type === 'success' ? styles.toastSuccess : styles.toastError}`}>
      <span className={styles.toastIcon}>{type === 'success' ? '✓' : '✗'}</span>
      <span className={styles.toastMessage}>{message}</span>
      <button className={styles.toastCloseBtn} onClick={onClose}>✕</button>
    </div>
  );
}

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const {
    selectedTrain,
    setSelectedTrain,
    selectedWagon,
    selectedSeats,
    clearSelection
  } = useBooking();

  const [toast, setToast] = useState(null);

  useEffect(() => {
    const train = trains.find((t) => t.id.toString() === trainId.toString());
    if (train) {
      setSelectedTrain(train);
    } else {
      navigate('/');
    }

    return () => {
      clearSelection();
    };
  }, [trainId, navigate, setSelectedTrain]);

  if (!selectedTrain) {
    return (
      <div className={styles.loading}>
        <p>Завантаження інформації про рейс...</p>
      </div>
    );
  }

  const departure = formatDateTime(selectedTrain.departure);
  const arrival = formatDateTime(selectedTrain.arrival);

  const handleBookingSubmit = (passengerData) => {
    const newBooking = {
      trainId: selectedTrain.id,
      trainNumber: selectedTrain.number,
      route: `${selectedTrain.from} → ${selectedTrain.to}`,
      wagonId: selectedWagon.id,
      wagonNumber: selectedWagon.number,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      passenger: passengerData,
      price: selectedWagon.price * selectedSeats.length
    };

    BookingService.saveBooking(newBooking);

    // Показуємо Toast повідомлення
    setToast({
      message: `Бронювання успішно оформлено! Місця: ${selectedSeats.join(', ')}`,
      type: 'success'
    });

    // Очищаємо обрані місця
    clearSelection();
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🚆</span>
            <Link to="/" className={styles.logoText}>Укрзалізниця</Link>
          </div>
          <p className={styles.subtitle}>Оформлення проїзних документів</p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <Link to="/" className={styles.backLink}>
            <span className={styles.backArrow}>←</span> Назад до пошуку рейсів
          </Link>

          {/* Train Summary Card */}
          <div className={styles.trainSummaryCard}>
            <div className={styles.trainNumberSection}>
              <span className={styles.trainIcon}>🚆</span>
              <span className={styles.trainNum}>{selectedTrain.number}</span>
            </div>
            <div className={styles.routeSection}>
              <div className={styles.routePoint}>
                <span className={styles.time}>{departure.time}</span>
                <span className={styles.city}>{selectedTrain.from}</span>
                <span className={styles.date}>{departure.date}</span>
              </div>
              <div className={styles.durationLine}>
                <span className={styles.duration}>{selectedTrain.duration}</span>
                <span className={styles.arrowLine}></span>
              </div>
              <div className={styles.routePoint}>
                <span className={styles.time}>{arrival.time}</span>
                <span className={styles.city}>{selectedTrain.to}</span>
                <span className={styles.date}>{arrival.date}</span>
              </div>
            </div>
          </div>

          <div className={styles.bookingGrid}>
            <div className={styles.leftColumn}>
              <WagonSelector />
              <SeatMap />
            </div>
            
            {selectedWagon && (
              <div className={styles.rightColumn}>
                <BookingForm onSubmit={handleBookingSubmit} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Укрзалізниця — Лабораторна робота 10</p>
      </footer>

      {toast && (
        <TempToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Booking;
