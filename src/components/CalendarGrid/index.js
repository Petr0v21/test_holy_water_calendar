import React from "react";
import styled from "styled-components";
import { MonthDaysList } from "../MonthDaysList";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${(props) => (props.isHeader ? "#1E1F21" : "#4D4C4D")};
  ${(props) => props.isHeader && `border-bottom: 1px solid #4D4C4D`}
`;

const CalendarGrid = ({
  startDay,
  today,
  totalDays,
  events,
  openFormHandler,
  setDisplayMode,
  setToday,
}) => {
  return (
    <>
      <GridWrapper>
        <MonthDaysList
          totalDays={totalDays}
          openFormHandler={openFormHandler}
          events={events}
          startDay={startDay}
          today={today}
          setDisplayMode={setDisplayMode}
          setToday={setToday}
        />
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
