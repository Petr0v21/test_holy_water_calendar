import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import { MonthDay } from "../MonthDay";

export const MonthDaysList = ({
  startDay,
  totalDays,
  events,
  openFormHandler,
  today,
  setDisplayMode,
}) => {
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());
  return daysMap.map((dayItem) => (
    <MonthDay
      today={today}
      key={dayItem}
      events={events.filter((event) =>
        isDayContainCurrentEvent(event, dayItem)
      )}
      openFormHandler={openFormHandler}
      dayItem={dayItem}
      setDisplayMode={setDisplayMode}
    />
  ));
};
