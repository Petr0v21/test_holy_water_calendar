import React, { useEffect, useState } from "react";
import moment from "moment";
import CalendarGrid from "../CalendarGrid";
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../helpers/constants";
import { ShadowWrapper } from "../../styled-components";
import { Monitor } from "../Monitor";
import { DayShowComponent } from "../DayShowComponent";
import FormEvent from "../FormEvent";

// window.moment = moment;
// {
//   id: 1,
//   title: "Go to bath",
//   description: "Go to bath",
//   date: 1674704500,
// },
// {
//   id: 2,
//   title: "Go to walk",
//   description: "Go to walk 23-th August",
//   date: 1674705568,
// },
// {
//   id: 3,
//   title: "Make 7-th lesson",
//   description: "Make 7-th lesson",
//   date: 1674705568,
// },

const storageName = "items";

const totalDays = 42;
const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};
function App() {
  const [events, setEvents] = useState([]);
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  moment.updateLocale("en", { week: { dow: 1 } });
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");
  const selectDate = (date) => setToday(moment.unix(date / 1000));
  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, displayMode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () =>
    setToday((prev) => prev.clone().add(1, displayMode));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);
  const [isShowFullForm, setShowFullForm] = useState(false);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    if (eventForUpdate) {
      setEvent(eventForUpdate);
    } else {
      setEvent({ ...defaultEvent, date: dayItem.format("X") });
      window.currentDay = dayItem.format("X");
    }
    setMethod(methodName);
  };

  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    setShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
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
    setEvent({ ...event, date: Number(window.currentDay) + timeUnix });
  };

  useEffect(() => {
    if (localStorage.getItem(storageName)) {
      const data = JSON.parse(localStorage.getItem(storageName));
      if (data && data.events) {
        setEvents(data.events);
      }
    }
  }, []);

  const eventFetchHandler = () => {
    if (validation()) {
      if (method === "Update") {
        setEvents((prevState) =>
          prevState.map((eventEl) =>
            eventEl.id === event.id ? event : eventEl
          )
        );
        localStorage.setItem(
          storageName,
          JSON.stringify({
            events: events.map((eventEl) =>
              eventEl.id === event.id ? event : eventEl
            ),
          })
        );
      } else {
        const id = events.length + 1;
        if (isShowFullForm) {
          let mid = Number(window.currentDay) + event.date;
          setEvents((prevState) => [...prevState, { ...event, date: mid, id }]);
          localStorage.setItem(
            storageName,
            JSON.stringify({
              events: [...events, { ...event, date: mid, id }],
            })
          );
        } else {
          setEvents((prevState) => [...prevState, { ...event, id }]);
          localStorage.setItem(
            storageName,
            JSON.stringify({
              events: [...events, { ...event, id }],
            })
          );
        }
      }
      console.log(localStorage);
      cancelButtonHandler();
    } else {
      alert("Field title and Date required!!!");
    }
  };

  const removeEventHandler = () => {
    setEvents((prevState) =>
      prevState.filter((eventEl) => eventEl.id !== event.id)
    );
    localStorage.setItem(
      storageName,
      JSON.stringify({
        events: events.filter((eventEl) => eventEl.id !== event.id),
      })
    );
    console.log(localStorage);
    cancelButtonHandler();
  };

  const validation = () => {
    return event.title.length && window.currentDay !== 0;
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
          selectDate={selectDate}
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
            setToday={setToday}
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
