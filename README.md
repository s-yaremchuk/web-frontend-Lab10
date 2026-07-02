# Ukrzaliznytsia Ticket Booking — Interactive Seat Selection SPA

A full-featured React SPA that extends the train search from Lab 9 into an end-to-end ticket booking flow. Users search for a route, choose a wagon class, select specific seats on a visualised wagon map, fill in passenger details, and confirm their booking — which is then persisted to `localStorage` so that booked seats remain unavailable across sessions.

This lab focuses on **complex React state management**: coordinating state across multiple components with Context API, building an interactive canvas-style seat map entirely in CSS/JSX, and implementing form validation with real-time feedback.

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?logo=reactrouter&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-1572B6?logo=css3&logoColor=white&style=flat-square)
![LocalStorage](https://img.shields.io/badge/localStorage-Booking_Persistence-lightgrey?style=flat-square)

| Concern            | Solution                                         |
|--------------------|--------------------------------------------------|
| UI framework       | React 19, CSS Modules, CSS custom properties     |
| Routing            | React Router v7 (hash-based SPA)                 |
| Global state       | Context API (`BookingContext`)                   |
| Persistence        | `localStorage` via `BookingService`              |
| Form validation    | Controlled inputs with regex patterns            |
| Notifications      | Custom animated Toast component                  |
| Bundler            | Vite 8                                           |

---

## ✨ Features

- **Inherited search (from LB9)** — departure/arrival city filter, train number search, and date picker carry over unchanged; selected train navigates to the booking page via React Router
- **Wagon class selector** — three class types available per train: **Плацкарт** (54 seats), **Купе** (36 seats), **СВ** (18 seats); each class has a distinct seat count and price per seat
- **Interactive seat map** — the wagon is rendered as an accurate visual floorplan including the conductor's cabin, corridor, toilets, and numbered berths; layout geometry adapts to the selected wagon class
- **Seat state system** — three visual states with distinct colours: 🟢 Available (selectable), 🔵 Selected (current session), 🔴 Occupied (booked in previous sessions, loaded from `localStorage`); occupied seats are non-interactive
- **Passenger form with real-time validation**:
  - Full name — required, non-empty
  - Phone — validated against the Ukrainian mobile format `+380XXXXXXXXX`
  - Email — RFC-compatible regex check
  - Inline error messages appear on blur; the submit button is disabled until at least one seat is selected and all fields pass validation
- **Booking confirmation** — confirmed bookings are written to `localStorage` via `BookingService`; the page state resets and the newly booked seats immediately turn red on the map
- **Toast notifications** — a slide-in animated toast displays success or error feedback; auto-dismisses after 3 seconds
- **Multi-page routing** — `Home` (`/`) and `Booking` (`/booking/:trainId`) are separate routes; the selected train is passed through `BookingContext` so the booking page never needs to re-fetch from a list

---

## 🏗 Architecture

```
src/
├── App.jsx                       # Route definitions: / → Home, /booking/:trainId → Booking
├── main.jsx                      # BrowserRouter + BookingProvider wrapper
├── index.css                     # Global styles, CSS variables (Ukrzaliznytsia brand)
│
├── context/
│   └── BookingContext.jsx        # Shared state: selectedTrain, wagon, seats, bookings list
│
├── services/
│   └── BookingService.js         # CRUD for bookings in localStorage (getBookings, addBooking)
│
├── data/
│   └── trains.js                 # Train + wagon catalogue (static mock)
│
├── pages/
│   ├── Home.jsx                  # Search + filter logic → navigates to /booking/:trainId
│   ├── Home.module.css
│   ├── Booking.jsx               # Orchestrates WagonSelector, SeatMap, BookingForm, Toast
│   └── Booking.module.css
│
└── components/
    ├── SearchBar.jsx             # Controlled search/date inputs; emits filter callback
    ├── TrainCard.jsx             # Presentational card; "Book" button triggers navigation
    ├── TrainList.jsx             # Maps filtered trains to TrainCard components
    ├── WagonSelector.jsx         # Tabs for wagon class; updates Context on selection
    ├── SeatMap.jsx               # SVG-like seat grid; calculates layout per wagon type
    ├── BookingForm.jsx           # Passenger data form with validation and submission
    └── Toast.jsx                 # Auto-dismissing animated notification
```

### State Architecture

```
BookingContext
├── selectedTrain  — train object passed from Home on navigation
├── selectedWagon  — current wagon class (set by WagonSelector)
├── selectedSeats  — Set of seat numbers chosen in the current session
└── bookings[]     — all confirmed bookings (initialised from localStorage)
```

`BookingService` is the only module that touches `localStorage`. The Context reads from it on initialisation and delegates writes to it on booking confirmation — maintaining a clean separation between UI state and persistence.

### Design Decisions

**Why Context API for this booking flow?**
The booking state (`selectedWagon`, `selectedSeats`) needs to be shared between three sibling component trees on the same page: `WagonSelector`, `SeatMap`, and `BookingForm`. Lifting state to `Booking.jsx` and passing props would work, but would make `Booking.jsx` a "prop-passing hub" with no real logic of its own. Context gives each component direct access to the booking state it cares about.

**Seat map rendered in JSX, not Canvas**
The wagon floorplan is built from `div` elements styled with CSS Grid, not a `<canvas>` or SVG. This means each seat is a real DOM node — it can receive click/hover events natively, responds to CSS transitions, and is fully accessible via keyboard focus. The trade-off is layout complexity for large wagon types (Плацкарт), which required careful grid-area math.

**`localStorage` as a mock booking database**
Storing bookings in `localStorage` simulates the persistence behaviour of a real backend without introducing a server dependency. The `BookingService` abstraction means swapping to a real API call in the future requires changing only that file.

---

## 🚀 Installation & Running

**Prerequisites:** Node.js ≥ 18

```bash
# Clone and enter the directory
git clone https://github.com/s-yaremchuk/web-frontend-Lab10.git
cd web-frontend-Lab10

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). No backend or API keys required.

---

## 📖 Usage

### Full booking flow

1. **Search** — enter city names or a train number on the home page; optionally select a travel date
2. **Select a train** — click **"Book"** on any train card; the app navigates to `/booking/:trainId`
3. **Choose a wagon class** — click one of the class tabs (Плацкарт / Купе / СВ) in the `WagonSelector`
4. **Pick seats** — click available (green) seats on the map; selected seats turn blue; click again to deselect
5. **Fill in passenger details** — enter name, phone (+380...), and email; errors appear in real time
6. **Confirm** — click **"Book ticket"**; a success toast appears, seats turn red, and the form resets

### Seat colour legend

| Colour | State | Meaning |
|--------|-------|---------|
| 🟢 Green | Available | Can be selected |
| 🔵 Blue | Selected | Chosen in this session |
| 🔴 Red | Occupied | Already booked (from `localStorage`) |

---

## 🔍 Challenges & Learnings

**Generating the correct seat layout per wagon class** — Плацкарт wagons have a non-trivial layout: compartment berths (upper/lower) on one side and side berths (upper/lower) on the other, with a different visual arrangement. Encoding this as a data structure (an array of row objects with seat type metadata) rather than hard-coded JSX made it possible to drive the entire grid from a single `SeatMap` component.

**Preventing booking conflicts across sessions** — when `Booking.jsx` mounts, it reads all existing bookings from `localStorage` for the current train and wagon, extracts the seat numbers, and stores them as "occupied" in local state. This ensures that seats booked in a previous session are visually blocked before the user interacts with the map at all.

**Form validation UX** — showing validation errors immediately on load is jarring; showing them only on submit means the user gets no feedback until the end. The chosen approach triggers validation on `onBlur` for each field individually, which balances feedback timing without being disruptive. The submit button's enabled/disabled state is derived from state (not computed in the submit handler), so it updates reactively.

**Keeping `BookingContext` focused** — an early version of the context contained UI state (whether the toast is visible, the toast message text). This leaked presentation concerns into a state-management layer. Refactoring the toast into fully local state inside `Booking.jsx` simplified the context and made both pieces independently testable.

---

## 🔭 Roadmap / What Could Be Improved

- [ ] Connect to a real backend API for train schedules and seat availability
- [ ] Implement user authentication so bookings are tied to an account, not just a browser
- [ ] Add a booking history page listing all past reservations
- [ ] Support selecting multiple passengers per booking (group travel)
- [ ] Add QR-code generation for the confirmed ticket
- [ ] Write end-to-end tests for the full booking flow (Playwright or Cypress)

---

## 👤 Author

**Serhii Yaremchuk** — 2nd year student, Client-Side Programming course  
GitHub: [s-yaremchuk](https://github.com/s-yaremchuk)
