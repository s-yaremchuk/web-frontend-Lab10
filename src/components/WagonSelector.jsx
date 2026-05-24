import { useBooking } from '../context/BookingContext';
import styles from './WagonSelector.module.css';

function WagonSelector() {
  const { selectedTrain, selectedWagon, setSelectedWagon, setSelectedSeats } = useBooking();

  if (!selectedTrain || !selectedTrain.wagons) {
    return null;
  }

  const handleWagonSelect = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]); // Clear selected seats when changing wagon
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.wagonList}>
        {selectedTrain.wagons.map((wagon) => {
          const isSelected = selectedWagon && selectedWagon.id === wagon.id;
          return (
            <button
              key={wagon.id}
              className={`${styles.wagonCard} ${isSelected ? styles.selected : ''}`}
              onClick={() => handleWagonSelect(wagon)}
              type="button"
            >
              <div className={styles.wagonHeader}>
                <span className={styles.wagonNumber}>Вагон №{wagon.number}</span>
              </div>
              <div className={styles.wagonBody}>
                <span className={styles.wagonType}>{wagon.type}</span>
                <span className={styles.wagonPrice}>₴ {wagon.price}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WagonSelector;
