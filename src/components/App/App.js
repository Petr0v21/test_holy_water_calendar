import React, { useEffect, useState } from "react";
import moment from "moment";
import CalendarGrid from "../CalendarGrid";
// import Header from "../Header";
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../helpers/constants";
import { ShadowWrapper } from "../../styled-components";
import { Monitor } from "../Monitor";
import { DayShowComponent } from "../DayShowComponent";
import FormEvent from "../FormEvent";

window.moment = moment;
// 1) Header with buttom(Create event) and navigate(show current mount and nav buttons that move for mounts) and icon calend(we can choose yaer and mount)
// 2) Grid Calendar`s with blocks(one block has number day, string name day, list events)

const totalDays = 42;
const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};
function App() {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  moment.updateLocale("en", { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, displayMode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () =>
    setToday((prev) => prev.clone().add(1, displayMode));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [isShowFullForm, setShowFullForm] = useState(false);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Go to bath",
      description: "Go to bath",
      date: 1674704500,
    },
    {
      id: 2,
      title: "Go to walk",
      description: "Go to walk 23-th August",
      date: 1674705568,
    },
    {
      id: 3,
      title: "Make 7-th lesson",
      description: "Make 7-th lesson",
      date: 1674705568,
    },
    {
      id: 4,
      title: "New event",
      description: "some text",
      date: 1674605568,
    },
  ]);
  // const startDayQuery = startDay.clone().format('X');
  // const endDayQuery = startDay.clone().add(totalDays,'days').format('X');
  useEffect(() => {
    console.log("Change", method);
  }, [method]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format("X") });
    console.log("met", methodName);
    window.currentDay = today.format("X");
    setMethod(methodName);
    console.log("Final check", method);
  };

  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    console.log("onDoubleClick", methodName);
    setShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
    console.log("Metod", method);
  };

  const openFullForm = () => {
    window.currentDay = 0;
    setMethod("Create");
    setEvent(defaultEvent);
    setShowFullForm(true);
    setShowForm(true);
  };

  const cancelButtonHandler = () => {
    setShowFullForm(false);
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const changeEventHandlerTime = (timeUnix) => {
    // console.log(window.currentDay);
    setEvent({ ...event, date: Number(window.currentDay) + timeUnix });
    // console.log(event);
  };

  const eventFetchHandler = () => {
    if (method === "Update") {
      setEvents((prevState) =>
        prevState.map((eventEl) => (eventEl.id === event.id ? event : eventEl))
      );
    } else {
      const id = events.length + 1;
      if (isShowFullForm) {
        let mid = Number(window.currentDay) + event.date;
        setEvents((prevState) => [...prevState, { ...event, date: mid, id }]);
      } else {
        setEvents((prevState) => [...prevState, { ...event, id }]);
      }
    }
    console.log(events);
    cancelButtonHandler();
  };

  const removeEventHandler = () => {
    console.log(event);
    setEvents((prevState) =>
      prevState.filter((eventEl) => eventEl.id !== event.id)
    );
    cancelButtonHandler();
  };

  return (
    <>
      {isShowForm ? (
        <FormEvent
          cancelButtonHandler={cancelButtonHandler}
          changeEventHandler={changeEventHandler}
          changeEventHandlerTime={changeEventHandlerTime}
          eventFetchHandler={eventFetchHandler}
          removeEventHandler={removeEventHandler}
          method={method}
          event={event}
          fullForm={isShowFullForm}
        />
      ) : null}
      <ShadowWrapper>
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          setDisplayMode={setDisplayMode}
          openFullForm={openFullForm}
          displayMode={displayMode}
        />
        {displayMode === DISPLAY_MODE_MONTH ? (
          <CalendarGrid
            startDay={startDay}
            today={today}
            totalDays={totalDays}
            events={events}
            openFormHandler={openModalFormHandler}
            setDisplayMode={setDisplayMode}
          />
        ) : null}
        {displayMode === DISPLAY_MODE_DAY ? (
          <DayShowComponent
            events={events}
            today={today}
            selectedEvent={event}
            setEvent={setEvent}
            changeEventHandler={changeEventHandler}
            changeEventHandlerTime={changeEventHandlerTime}
            cancelButtonHandler={cancelButtonHandler}
            eventFetchHandler={eventFetchHandler}
            method={method}
            removeEventHandler={removeEventHandler}
            openFormHandler={openFormHandler}
          />
        ) : null}
      </ShadowWrapper>
    </>
  );
}

export default App;
