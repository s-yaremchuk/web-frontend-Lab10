import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TrainList from '../components/TrainList';
import { trains } from '../data/trains';
import styles from './Home.module.css';

function Home() {
  const [filteredTrains, setFilteredTrains] = useState(trains);

  const handleSearch = ({ query, date }) => {
    let result = trains;

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (train) =>
          train.from.toLowerCase().includes(q) ||
          train.to.toLowerCase().includes(q) ||
          train.number.toLowerCase().includes(q)
      );
    }

    if (date) {
      result = result.filter((train) => {
        const trainDate = new Date(train.departure).toISOString().split('T')[0];
        return trainDate === date;
      });
    }

    setFilteredTrains(result);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🚆</span>
            <div>
              <h1 className={styles.title}>Укрзалізниця</h1>
              <p className={styles.subtitle}>Система бронювання залізничних квитків</p>
            </div>
          </div>
        </div>
        <div className={styles.headerDecor}></div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.searchSection}>
            <h2 className={styles.sectionTitle}>Знайдіть свій рейс</h2>
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className={styles.resultsSection}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.sectionTitle}>Доступні рейси</h2>
              <span className={styles.count}>{filteredTrains.length} рейсів</span>
            </div>
            <TrainList trains={filteredTrains} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
