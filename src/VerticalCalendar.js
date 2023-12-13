// VerticalCalendar.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerticalCalendar = () => {
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
    // További események hozzáadása a megfelelő dátumokkal és típusokkal
  ]);
  

//   // További események a jelenlegi dátumok után 2 nappal
//   const currentDate = moment();
//   for (let i = 1; i <= 10; i++) {
//     const newDate = currentDate.clone().add(i * 2, 'days');
//     const newEvent = {
//       date: newDate.format('YYYY-MM-DD'),
//       title: `Esemény ${i + 2}`,
//       description: `Leírás ${i + 2}`,
//     };
//     events.push(newEvent);
//   }

  const getEventsForDate = (date) => {
    return events.filter((event) => moment(event.date).isSame(date, 'day'));
  };

  const renderEvents = (betu) => {
    const daysInMonth = moment(selectedDate).daysInMonth();
    const eventsByDay = Array.from({ length: daysInMonth }, (_, index) => {
      const day = moment(selectedDate).date(index + 1);
      return { date: day.format('YYYY-MM-DD'), events: getEventsForDate(day) };
    });

    return eventsByDay.map((day, index) => (
      <div key={index}>
        <h5>{moment(day.date).format('YYYY-MM-DD')}</h5>
        {day.events
        .filter((event) => event.type === betu)
        .map((event, eventIndex) => (
            <div key={eventIndex} className="card">
                <div className="card-body">
                    <h6 className="card-title">{event.title}</h6>
                    <p className="card-text">{event.description}</p>
                </div>
            </div>
        ))}
      </div>
    ));
  };

  const renderHighlightedDays = () => {
    const daysWithEvents = events
      .map((event) => moment(event.date).date())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b);

    return (
      <div className="highlighted-days-container">
        {daysWithEvents.map((day, index) => (
          <div key={index} className="highlighted-day">
            {day}
          </div>
        ))}
      </div>
    );
  };


  return (
    <div>
      <h2>Függőleges Naptár</h2>

      <div className="container">
        <div className="row">
            <div className="col">
                  {renderEvents('A')}
            </div>
            <div className="col">
                {renderEvents('B')}
            </div>
            <div className="col">
                {renderEvents('C')}
            </div>
            <div className="col">
                {renderHighlightedDays()}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalCalendar;
