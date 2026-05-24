import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import styles from './BookingForm.module.css';

function BookingForm({ onSubmit }) {
  const { selectedSeats, selectedWagon } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Name validation
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      newErrors.name = 'Ім\'я та прізвище є обов\'язковими';
    } else if (nameTrimmed.length < 2) {
      newErrors.name = 'Ім\'я має містити щонайменше 2 символи';
    } else if (!/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/.test(nameTrimmed)) {
      newErrors.name = 'Ім\'я може містити лише літери, пробіли та дефіси';
    }

    // Phone validation
    const phoneTrimmed = formData.phone.trim();
    if (!phoneTrimmed) {
      newErrors.phone = 'Номер телефону є обов\'язковим';
    } else if (!/^\+380\d{9}$/.test(phoneTrimmed)) {
      newErrors.phone = 'Телефон має бути у форматі +380XXXXXXXXX';
    }

    // Email validation
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = 'Електронна пошта є обов\'язковою';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = 'Некоректний формат електронної пошти';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const isNoSeatsSelected = !selectedSeats || selectedSeats.length === 0;
  const totalPrice = selectedWagon ? selectedSeats.length * selectedWagon.price : 0;

  return (
    <div className={styles.formCard}>
      <h3 className={styles.title}>Дані пасажира</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="passenger-name" className={styles.label}>Ім'я та Прізвище</label>
          <input
            type="text"
            id="passenger-name"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Іван Петренко"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="passenger-phone" className={styles.label}>Номер телефону</label>
          <input
            type="tel"
            id="passenger-phone"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
            placeholder="+380991234567"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="passenger-email" className={styles.label}>Електронна пошта</label>
          <input
            type="email"
            id="passenger-email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="example@mail.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.summaryContainer}>
          <div className={styles.summaryRow}>
            <span>Обрано місць:</span>
            <strong>{isNoSeatsSelected ? 'жодного' : selectedSeats.length}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Загальна вартість:</span>
            <span className={styles.totalPrice}>₴ {totalPrice}</span>
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isNoSeatsSelected}
        >
          {isNoSeatsSelected ? 'Оберіть місця для бронювання' : 'Оформити квиток'}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
