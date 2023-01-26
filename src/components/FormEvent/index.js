import React from "react";
import styled from "styled-components";
import {
  ButtonsWrapper,
  ButtonWrapper,
  EventBody,
  EventTitle,
  FormPositionWrapper,
  FormWrapper,
} from "../../styled-components";

const DataTimeRow = styled.div`
  display: flex;
`;

const FormEvent = ({
  cancelButtonHandler,
  changeEventHandler,
  changeEventHandlerTime,
  eventFetchHandler,
  removeEventHandler,
  method,
  event,
  fullForm,
}) => {
  console.log(method);
  return (
    <>
      <FormPositionWrapper onClick={cancelButtonHandler}>
        <FormWrapper onClick={(e) => e.stopPropagation()}>
          <EventTitle
            value={event.title}
            onChange={(e) => changeEventHandler(e.target.value, "title")}
            placeholder="Title"
          />
          <EventBody
            value={event.description}
            onChange={(e) => changeEventHandler(e.target.value, "description")}
            placeholder="Description"
          />
          <DataTimeRow>
            <input
              type="time"
              id="appt"
              name="appt"
              required
              onChange={(e) =>
                changeEventHandlerTime(e.target.valueAsNumber / 1000)
              }
            />
            {fullForm && (
              <input
                type="date"
                onChange={(e) => {
                  window.currentDay = e.target.valueAsNumber / 1000;
                }}
              />
            )}
          </DataTimeRow>
          <ButtonsWrapper>
            <ButtonWrapper onClick={cancelButtonHandler}>Cancel</ButtonWrapper>
            <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
            {method === "Update" ? (
              <ButtonWrapper danger onClick={removeEventHandler}>
                Remove
              </ButtonWrapper>
            ) : null}
          </ButtonsWrapper>
        </FormWrapper>
      </FormPositionWrapper>
    </>
  );
};

export default FormEvent;
