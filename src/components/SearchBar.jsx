import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch({ query: value, date });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    onSearch({ query, date: value });
  };

  const handleClear = () => {
    setQuery('');
    setDate('');
    onSearch({ query: '', date: '' });
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputGroup}>
        <span className={styles.icon}>🔍</span>
        <input
          type="text"
          className={styles.input}
          placeholder="Звідки або куди? (напр. Київ, Львів)"
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <span className={styles.icon}>📅</span>
        <input
          type="date"
          className={styles.input}
          value={date}
          onChange={handleDateChange}
        />
      </div>

      {(query || date) && (
        <button className={styles.clearBtn} onClick={handleClear}>
          ✕ Скинути
        </button>
      )}
    </div>
  );
}

export default SearchBar;
