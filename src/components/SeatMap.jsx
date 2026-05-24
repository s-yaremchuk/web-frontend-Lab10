import { useEffect, useState } from 'react';
import { useBooking } from '../context/BookingContext';
import BookingService from '../services/BookingService';
import styles from './SeatMap.module.css';

function SeatMap() {
  const { selectedTrain, selectedWagon, selectedSeats, toggleSeat } = useBooking();
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (selectedTrain && selectedWagon) {
      const booked = BookingService.getBookedSeats(selectedTrain.id, selectedWagon.id);
      setBookedSeats(booked);
    }
  }, [selectedTrain, selectedWagon, selectedSeats]); // reload if seats or train/wagon changes

  if (!selectedTrain || !selectedWagon) {
    return (
      <div className={styles.placeholder}>
        <p>Будь ласка, оберіть вагон, щоб побачити схему місць</p>
      </div>
    );
  }

  const { type } = selectedWagon;

  // Generate seat layout based on wagon type
  const renderCompartmentSeats = (compIndex) => {
    // Compartment numbers:
    // Comp 1: 1, 2 (left side - top/bottom) & 3, 4 (right side - top/bottom)
    const base = compIndex * 4;
    const compSeats = [
      { num: base + 1, label: `${base + 1} (Н)` }, // Нижнє
      { num: base + 2, label: `${base + 2} (В)` }, // Верхнє
      { num: base + 3, label: `${base + 3} (Н)` },
      { num: base + 4, label: `${base + 4} (В)` }
    ];

    return (
      <div key={compIndex} className={styles.compartment}>
        <div className={styles.compartmentNumber}>{compIndex + 1}</div>
        <div className={styles.compartmentSeatsGrid}>
          {compSeats.map((seat) => renderSeat(seat.num, seat.label))}
        </div>
      </div>
    );
  };

  const renderSVSeats = (compIndex) => {
    // SV has 2 lower seats per compartment. 9 compartments = 18 seats.
    const base = compIndex * 2;
    const compSeats = [
      { num: base + 1, label: `${base + 1} (Н)` },
      { num: base + 2, label: `${base + 2} (Н)` }
    ];

    return (
      <div key={compIndex} className={styles.compartment}>
        <div className={styles.compartmentNumber}>{compIndex + 1}</div>
        <div className={styles.compartmentSeatsGridSV}>
          {compSeats.map((seat) => renderSeat(seat.num, seat.label))}
        </div>
      </div>
    );
  };

  const renderPlackartLayout = () => {
    // Plackart: 9 compartments of 4 seats (1-36) and 18 side seats (37-54)
    // Side seats are opposite the compartments:
    // Compartment 1 (seats 1-4) has side seats 53, 54 opposite it.
    // Compartment 9 (seats 33-36) has side seats 37, 38 opposite it.
    const sections = [];
    for (let i = 0; i < 9; i++) {
      const base = i * 4;
      const compSeats = [
        { num: base + 1, label: `${base + 1} (Н)` },
        { num: base + 2, label: `${base + 2} (В)` },
        { num: base + 3, label: `${base + 3} (Н)` },
        { num: base + 4, label: `${base + 4} (В)` }
      ];
      
      const sideLower = 54 - (i * 2 + 1);
      const sideUpper = 54 - (i * 2);
      const sideSeats = [
        { num: sideLower, label: `${sideLower} (Н)` },
        { num: sideUpper, label: `${sideUpper} (В)` }
      ];

      sections.push(
        <div key={i} className={styles.plackartSection}>
          <div className={styles.compartment}>
            <div className={styles.compartmentNumber}>{i + 1}</div>
            <div className={styles.compartmentSeatsGrid}>
              {compSeats.map((seat) => renderSeat(seat.num, seat.label))}
            </div>
          </div>
          <div className={styles.corridorSpace}></div>
          <div className={styles.sideCompartment}>
            <div className={styles.sideSeatsGrid}>
              {sideSeats.map((seat) => renderSeat(seat.num, seat.label))}
            </div>
          </div>
        </div>
      );
    }
    return <div className={styles.wagonBodyPlackart}>{sections}</div>;
  };

  const renderSeat = (num, label) => {
    const isBooked = bookedSeats.includes(num);
    const isSelected = selectedSeats.includes(num);

    let seatClass = styles.free;
    if (isBooked) {
      seatClass = styles.booked;
    } else if (isSelected) {
      seatClass = styles.selected;
    }

    return (
      <button
        key={num}
        className={`${styles.seat} ${seatClass}`}
        disabled={isBooked}
        onClick={() => toggleSeat(num)}
        type="button"
        title={isBooked ? 'Місце заброньовано' : isSelected ? 'Обране вами місце' : 'Вільне місце'}
      >
        <span className={styles.seatNum}>{label}</span>
      </button>
    );
  };

  const renderWagonBody = () => {
    if (type === 'Плацкарт') {
      return renderPlackartLayout();
    }

    const numComp = 9;
    const comps = [];
    for (let i = 0; i < numComp; i++) {
      if (type === 'СВ') {
        comps.push(renderSVSeats(i));
      } else {
        comps.push(renderCompartmentSeats(i));
      }
    }
    return <div className={styles.wagonBodyCompartment}>{comps}</div>;
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Схема місць — Вагон №{selectedWagon.number} ({type})</h3>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.free}`}></span>
          <span>Вільне</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.selected}`}></span>
          <span>Обране</span>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendColor} ${styles.booked}`}></span>
          <span>Зайняте</span>
        </div>
      </div>

      <div className={styles.wagonScrollWrapper}>
        <div className={styles.wagonContainer}>
          {/* Cabin Conductor */}
          <div className={styles.conductorCabin}>
            <span className={styles.cabinText}>Провідник</span>
          </div>

          {/* Compartments & Seats */}
          {renderWagonBody()}

          {/* Restrooms */}
          <div className={styles.restroom}>
            <span className={styles.restroomText}>WC</span>
          </div>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className={styles.summaryInfo}>
          Обрано місць: <strong>{selectedSeats.join(', ')}</strong> на суму <strong>₴ {selectedSeats.length * selectedWagon.price}</strong>
        </div>
      )}
    </div>
  );
}

export default SeatMap;
