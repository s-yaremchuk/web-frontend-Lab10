import { Link } from 'react-router-dom';
import styles from './TrainCard.module.css';

function TrainCard({ train }) {
  const departureDate = new Date(train.departure);
  const arrivalDate = new Date(train.arrival);

  const formatTime = (date) => {
    return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
  };

  const minPrice = Math.min(...train.wagons.map(w => w.price));
  const wagonTypes = [...new Set(train.wagons.map(w => w.type))];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.trainNumber}>
          <span className={styles.numberIcon}>🚂</span>
          <span className={styles.number}>{train.number}</span>
        </div>
        <div className={styles.duration}>
          <span className={styles.durationIcon}>⏱</span>
          {train.duration}
        </div>
      </div>

      <div className={styles.route}>
        <div className={`${styles.station} ${styles.departure}`}>
          <span className={styles.time}>{formatTime(departureDate)}</span>
          <span className={styles.date}>{formatDate(departureDate)}</span>
          <span className={styles.city}>{train.from}</span>
        </div>

        <div className={styles.routeLine}>
          <div className={styles.dot}></div>
          <div className={styles.line}></div>
          <div className={styles.arrow}>→</div>
          <div className={styles.line}></div>
          <div className={styles.dot}></div>
        </div>

        <div className={`${styles.station} ${styles.arrival}`}>
          <span className={styles.time}>{formatTime(arrivalDate)}</span>
          <span className={styles.date}>{formatDate(arrivalDate)}</span>
          <span className={styles.city}>{train.to}</span>
        </div>
      </div>

      <div className={styles.badges}>
        {wagonTypes.map((type) => (
          <span key={type} className={styles.badge}>{type}</span>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <span className={styles.priceLabel}>від</span>
          <span className={styles.priceValue}>{minPrice} ₴</span>
        </div>
        <Link to={`/booking/${train.id}`} className={styles.selectBtn}>
          Обрати місця
        </Link>
      </div>
    </div>
  );
}

export default TrainCard;
