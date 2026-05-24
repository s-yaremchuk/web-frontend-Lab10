import TrainCard from './TrainCard';
import styles from './TrainList.module.css';

function TrainList({ trains }) {
  if (!trains || trains.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <h3 className={styles.emptyTitle}>Потягів не знайдено</h3>
        <p className={styles.emptyText}>
          Спробуйте змінити параметри пошуку або оберіть інший маршрут
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {trains.map((train, index) => (
        <div key={train.id} className="animateFadeInUp" style={{ animationDelay: `${index * 0.08}s`, opacity: 0 }}>
          <TrainCard train={train} />
        </div>
      ))}
    </div>
  );
}

export default TrainList;
