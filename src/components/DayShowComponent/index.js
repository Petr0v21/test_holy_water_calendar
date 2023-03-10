import React from "react";
import moment from "moment";
import styled from "styled-components";
import { isDayContainCurrentEvent } from "../../helpers";
import {
  ButtonsWrapper,
  ButtonWrapper,
  EventBody,
  EventItemWrapper,
  EventTitle,
  TimeInput,
} from "../../styled-components";

const DayShowWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648; ;
`;

const EventsListWrapper = styled("div")`
  background-color: #1e1f21;
  color: #dddddd;
  flex-grow: 1;
`;

const EventFormWrapper = styled("div")`
  background-color: #27282a;
  color: #dddddd;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648; ;
`;
const NoEventMsg = styled("div")`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const cellsInDay = 24;

const ScaleWrapper = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`;

const ScaleCellWrapper = styled("div")`
  flex-grow: 1;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

const ScaleCellTimeWrapper = styled("div")`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;
const OpenFormWrapper = styled("div")`
  display: flex;
  justify-content: center;
  padding: 5%;
`;

const ScaleCellEventWrapper = styled("div")`
  min-height: 16px;
`;

export const DayShowComponent = ({
  events,
  today,
  selectedEvent,
  changeEventHandler,
  changeEventHandlerTime,
  cancelButtonHandler,
  eventFetchHandler,
  method,
  removeEventHandler,
  openFormHandler,
}) => {
  const eventList = events.filter((event) =>
    isDayContainCurrentEvent(event, today)
  );

  const x = [...new Array(cellsInDay)].map((_, i) => {
    const temp = [];
    eventList.forEach((event) => {
      if (+moment.unix(+event.date).format("H") === i) {
        temp.push(event);
      }
    });

    return temp;
  });
  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <ScaleWrapper>
          {x.map((_, i) => (
            <ScaleCellWrapper key={i}>
              <ScaleCellTimeWrapper>
                {i ? <>{`${i}`.padStart(2, "0")}:00</> : null}
              </ScaleCellTimeWrapper>
              <ScaleCellEventWrapper>
                {_.map((e, index) => (
                  <EventItemWrapper
                    key={e.date + index}
                    onClick={() => {
                      openFormHandler("Update", e);
                    }}
                  >
                    {e.title}
                  </EventItemWrapper>
                ))}
              </ScaleCellEventWrapper>
            </ScaleCellWrapper>
          ))}
        </ScaleWrapper>
      </EventsListWrapper>
      <EventFormWrapper>
        {selectedEvent ? (
          <div>
            <EventTitle
              value={selectedEvent.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Title"
              required
              inCurentDay
            />
            <EventBody
              value={selectedEvent.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Description"
              required
              inCurentDay
            />
            <div>
              <TimeInput
                type="time"
                id="appt"
                name="appt"
                required
                onChange={(event) =>
                  changeEventHandlerTime(event.target.valueAsNumber / 1000)
                }
              />
            </div>
            <ButtonsWrapper>
              <ButtonWrapper onClick={cancelButtonHandler}>
                Cancel
              </ButtonWrapper>
              <ButtonWrapper onClick={eventFetchHandler}>
                {method}
              </ButtonWrapper>
              {method === "Update" ? (
                <ButtonWrapper danger onClick={removeEventHandler}>
                  Remove
                </ButtonWrapper>
              ) : null}
            </ButtonsWrapper>
          </div>
        ) : (
          <>
            <OpenFormWrapper>
              <ButtonWrapper
                onClick={() => openFormHandler("Create", null, today)}
              >
                Create new event
              </ButtonWrapper>
            </OpenFormWrapper>
            <NoEventMsg>No event selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};
