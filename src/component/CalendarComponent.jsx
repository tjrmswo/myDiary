import React, { useState } from "react";

// libraries
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Container>
      <div className="calendarContainer"></div>
      <Calendar
        className="react-calendar"
        onChange={(dates) => setDate(dates)}
        value={date}
      />
    </Container>
  );
};

export default CalendarComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  height: 100vh;

  .calendarContainer {
    margin-top: 8rem;
  }

  .react-calendar {
    width: 50vw;
    height: 60vh;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 2.5em;
  }

  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }

  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }

  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
  }
`;
