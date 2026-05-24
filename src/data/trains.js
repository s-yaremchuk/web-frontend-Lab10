export const trains = [
  {
    id: 1,
    number: '091К',
    from: 'Київ',
    to: 'Львів',
    departure: '2026-05-25T08:15:00',
    arrival: '2026-05-25T14:30:00',
    duration: '6 год 15 хв',
    wagons: [
      { id: 1, type: 'Плацкарт', number: 1, seats: 54, price: 350 },
      { id: 2, type: 'Плацкарт', number: 2, seats: 54, price: 350 },
      { id: 3, type: 'Купе', number: 3, seats: 36, price: 580 },
      { id: 4, type: 'Купе', number: 4, seats: 36, price: 580 },
      { id: 5, type: 'СВ', number: 5, seats: 18, price: 950 }
    ]
  },
  {
    id: 2,
    number: '043Щ',
    from: 'Київ',
    to: 'Одеса',
    departure: '2026-05-25T22:40:00',
    arrival: '2026-05-26T06:15:00',
    duration: '7 год 35 хв',
    wagons: [
      { id: 6, type: 'Плацкарт', number: 1, seats: 54, price: 420 },
      { id: 7, type: 'Плацкарт', number: 2, seats: 54, price: 420 },
      { id: 8, type: 'Купе', number: 3, seats: 36, price: 690 },
      { id: 9, type: 'Купе', number: 4, seats: 36, price: 690 }
    ]
  },
  {
    id: 3,
    number: '012Ш',
    from: 'Львів',
    to: 'Харків',
    departure: '2026-05-26T17:00:00',
    arrival: '2026-05-27T07:30:00',
    duration: '14 год 30 хв',
    wagons: [
      { id: 10, type: 'Плацкарт', number: 1, seats: 54, price: 580 },
      { id: 11, type: 'Купе', number: 2, seats: 36, price: 850 },
      { id: 12, type: 'Купе', number: 3, seats: 36, price: 850 },
      { id: 13, type: 'СВ', number: 4, seats: 18, price: 1350 }
    ]
  },
  {
    id: 4,
    number: '075К',
    from: 'Дніпро',
    to: 'Київ',
    departure: '2026-05-25T19:30:00',
    arrival: '2026-05-26T02:45:00',
    duration: '7 год 15 хв',
    wagons: [
      { id: 14, type: 'Купе', number: 1, seats: 36, price: 490 },
      { id: 15, type: 'Купе', number: 2, seats: 36, price: 490 },
      { id: 16, type: 'СВ', number: 3, seats: 18, price: 890 }
    ]
  },
  {
    id: 5,
    number: '108П',
    from: 'Запоріжжя',
    to: 'Львів',
    departure: '2026-05-26T15:20:00',
    arrival: '2026-05-27T08:10:00',
    duration: '16 год 50 хв',
    wagons: [
      { id: 17, type: 'Плацкарт', number: 1, seats: 54, price: 620 },
      { id: 18, type: 'Плацкарт', number: 2, seats: 54, price: 620 },
      { id: 19, type: 'Купе', number: 3, seats: 36, price: 920 },
      { id: 20, type: 'Купе', number: 4, seats: 36, price: 920 }
    ]
  },
  {
    id: 6,
    number: '067Л',
    from: 'Київ',
    to: 'Запоріжжя',
    departure: '2026-05-25T07:00:00',
    arrival: '2026-05-25T13:25:00',
    duration: '6 год 25 хв',
    wagons: [
      { id: 21, type: 'Плацкарт', number: 1, seats: 54, price: 380 },
      { id: 22, type: 'Купе', number: 2, seats: 36, price: 610 },
      { id: 23, type: 'Купе', number: 3, seats: 36, price: 610 }
    ]
  },
  {
    id: 7,
    number: '023К',
    from: 'Харків',
    to: 'Одеса',
    departure: '2026-05-26T20:15:00',
    arrival: '2026-05-27T09:00:00',
    duration: '12 год 45 хв',
    wagons: [
      { id: 24, type: 'Плацкарт', number: 1, seats: 54, price: 530 },
      { id: 25, type: 'Купе', number: 2, seats: 36, price: 790 },
      { id: 26, type: 'СВ', number: 3, seats: 18, price: 1250 }
    ]
  },
  {
    id: 8,
    number: '055Щ',
    from: 'Одеса',
    to: 'Київ',
    departure: '2026-05-25T16:50:00',
    arrival: '2026-05-26T00:30:00',
    duration: '7 год 40 хв',
    wagons: [
      { id: 27, type: 'Купе', number: 1, seats: 36, price: 450 },
      { id: 28, type: 'Купе', number: 2, seats: 36, price: 450 },
      { id: 29, type: 'СВ', number: 3, seats: 18, price: 820 }
    ]
  }
];
