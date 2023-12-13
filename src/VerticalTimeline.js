// VerticalTimeline.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './VerticalTimeline.css'; // Importáljuk a stíluslapot
import 'bootstrap/dist/css/bootstrap.min.css';

// VerticalTimeline.js
// ...

const VerticalTimeline = () => {
  // 1. Az állapotok deklarálása
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: '2023-12-13', title: 'Esemény 1', description: 'Leírás 1', type: 'A' },
    { date: '2023-12-02', title: 'Esemény 2', description: 'Leírás 2', type: 'B' },
    { date: '2023-12-03', title: 'Esemény 3', description: 'Leírás 3', type: 'C' },
    { date: '2023-12-04', title: 'Esemény 4', description: 'Leírás 4', type: 'A' },
    { date: '2023-12-05', title: 'Esemény 5', description: 'Leírás 5', type: 'B' },
    { date: '2023-12-06', title: 'Esemény 6', description: 'Leírás 6', type: 'C' },
    { date: '2023-12-06', title: 'Esemény 7', description: 'Leírás 7', type: 'A' },
    { date: '2023-12-10', title: 'Esemény 8', description: 'Leírás 8', type: 'B' },
    { date: '2023-12-10', title: 'Esemény 8', description: 'Leírás 8', type: 'C' },
    { date: '2023-12-06', title: 'Esemény 6', description: 'Leírás 6', type: 'C' },
    { date: '2023-12-06', title: 'Esemény 7', description: 'Leírás 7', type: 'A' },
    { date: '2023-12-10', title: 'Esemény 8', description: 'Leírás 8', type: 'B' },
    { date: '2023-12-10', title: 'Esemény 8', description: 'Leírás 8', type: 'C' },
    // További események hozzáadása a megfelelő dátumokkal és típusokkal
  ]);

  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [visibleDays, setVisibleDays] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Új állapot a lapozáshoz

  // 2. Komponens életciklusának figyelése az állapotok frissítésére
  useEffect(() => {
    // 3. A hónap napjainak meghatározása
    const daysInMonth = moment(selectedDate).daysInMonth();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) =>
      moment(selectedDate).date(index + 1)
    );

    // 4. Az állapotok frissítése
    setAllDays(daysArray);
    setVisibleDays(daysArray.slice(0, 10 * currentPage));
    setDisplayedEvents(getEventsForVisibleDays());
  }, [selectedDate, events, currentPage]); // currentPage hozzáadása a dependency array-hez

  // 5. Az oldal betöltésekor események lekérdezése
  useEffect(() => {
    setDisplayedEvents(getEventsForVisibleDays());
  }, []); // Az üres dependency array miatt csak egyszer fut le, az oldal betöltésekor

  // 6. Dátumválasztó kezelése
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 7. Események lekérdezése egy adott dátumra
  const getEventsForDate = (date) => {
    return events.filter((event) => moment(event.date).isSame(date, 'day'));
  };

  // 8. Megjelenített napokhoz tartozó események lekérdezése
  const getEventsForVisibleDays = () => {
    return visibleDays.reduce((acc, day) => {
      const eventsForDay = getEventsForDate(day);
      if (eventsForDay.length > 0) {
        acc.push({ date: day.format('YYYY-MM-DD'), events: eventsForDay });
      }
      return acc;
    }, []);
  };

  // 9. Kártya magasságának számolása
  const calculateCardHeight = () => {
    const totalHeight = window.innerHeight * 0.1; // 10% of window height
    const maxEventsPerDay = Math.max(
      ...visibleDays.map((day) => getEventsForDate(day).length)
    );
    const cardHeight = totalHeight / maxEventsPerDay;
    return cardHeight < 60 ? 60 : cardHeight; // Minimum card height of 60px
  };

  // 10. Események megjelenítése
  const renderEvents = () => {
    return displayedEvents.map((day, index) => (
      <div key={index}>
        <h5>{moment(day.date).format('YYYY-MM-DD')}</h5>
        <div className="event-container">
          {day.events.map((event, eventIndex) => (
            <div
              key={eventIndex}
              className="event-circle"
              style={{
                height: `${calculateCardHeight()}px`,
                width: `${calculateCardHeight()}px`,
                position: 'relative',
              }}
            >
              <div className="event-card" style={{ display: 'none', position: 'absolute', top: '100%', left: 0 }}>
                <div className="card-body">
                  <h6 className="card-title">{event.title}</h6>
                  <p className="card-text">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  // 11. Görgetés kezelése
  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop;
    const totalHeight = container.scrollHeight;
    const visibleHeight = container.clientHeight;

    if (scrollPosition + visibleHeight === totalHeight) {
      // Scroll reached the bottom
      setCurrentPage((prevPage) => prevPage + 1); // Lapozás növelése
    }
  };

  // 12. Kiemelt napok megjelenítése
  const renderHighlightedDays = () => {
    return (
      <div className="highlighted-days-container">
        {allDays.map((day, index) => (
          <div key={index} className={`highlighted-day ${visibleDays.includes(day) ? 'highlighted' : ''}`}>
            {day.format('DD')}
          </div>
        ))}
      </div>
    );
  };

  // 13. A komponens renderelése
  return (
    <div>
      <h2>Függőleges Idővonal</h2>
      <p>Valassz egy random datumot hogy lerenderelodjon xd</p>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />

      <div className="timeline-container" onScroll={handleScroll}>
        <div className="timeline-events">{renderEvents()}</div>
        <div className="timeline-highlighted-days">{renderHighlightedDays()}</div>
      </div>
    </div>
  );
};

// 14. A komponens exportálása
export default VerticalTimeline;
