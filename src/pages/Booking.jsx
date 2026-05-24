import { useParams, Link } from 'react-router-dom';
import styles from './Booking.module.css';

function Booking() {
  const { trainId } = useParams();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>← Назад до списку</Link>
        <h1>Бронювання місць</h1>
        <p>Потяг ID: {trainId}</p>
      </div>
    </div>
  );
}

export default Booking;
