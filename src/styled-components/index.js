import styled from "styled-components";

export const CellWrapper = styled.div`
  min-height: ${(props) => (props.isHeader ? 24 : 94)}px;
  min-width: 120px;
  background-color: ${(props) => (props.isWeekday ? "#27282A" : "#1E1F21")};
  color: ${(props) => (props.isSelectedMonth ? "#DDDDDD" : "#555759")};
`;

export const RowInCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`}
`;

export const EventListWrapper = styled("ul")`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventListItemWrapper = styled("li")`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

export const EventItemWrapper = styled("button")`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

export const EventTitle = styled.input`
  padding: 8px 14px;
  font-size: 0.85rem;
  ${(props) => (props.inCurentDay ? "width: 100%;" : "")}
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

export const EventBody = styled.textarea`
  padding: 8px 14px;
  font-size: 0.85rem;
  ${(props) => (props.inCurentDay ? "width: 100%;" : "")}
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

export const ButtonsWrapper = styled("div")`
  padding: 8px 14px;
  display: flex;
  // justify-content: flex-end;
  justify-content: space-evenly;
`;

export const ButtonWrapper = styled("div")`
  color: ${(props) => (props.danger ? "#f00" : "#dddddd")};
  border: 1px solid ${(props) => (props.danger ? "#f00" : "#dddddd")};
  border-radius: 2px;
  font-size: 14px;
  padding: 8px 14px;
  color: #dddddd;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:not(:last-child) {
    margin-right: 2px;
  }
  &:hover {
    background: black;
    color: ${(props) => (props.danger ? "#f00" : "white")};
  }
`;

export const ShadowWrapper = styled("div")`
  min-width: 850px;
  height: 702px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;

export const FormPositionWrapper = styled("div")`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  min-width: 320px;
  height: auto;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`;

export const DatePicker = styled("input")`
  width: 60px;
  height: 40px;
  border: 0;
  margin-right: 8px;
  background: rgba(0, 0, 0, 0);
  &:focus-visible {
    outline: 0px solid crimson;
  }

  &::-webkit-datetime-edit-month-field {
    visibility: hidden;
    width: 0;
  }
  &::-webkit-datetime-edit-day-field {
    visibility: hidden;
    width: 0;
  }
  &::-webkit-datetime-edit-year-field {
    visibility: hidden;
    width: 0;
  }

  &::-webkit-calendar-picker-indicator {
    visibility: visible;
    font-size: 18px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const TextWrapper = styled("span")`
  font-size: 24px;
`;

export const TitleWrapper = styled(TextWrapper)`
  font-weight: 700;
  margin-right: 8px;
  margin-left: 8px;
`;

export const OpenFullFormButton = styled("span")`
  width: 40px;
  height: 40px;
  font-size: 24px;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const TimeInput = styled("input")`
  padding: 8px 14px;
  font-size: 0.85rem;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  &:focus-visible {
    outline: 0px solid crimson;
  }
  &::-webkit-calendar-picker-indicator {
    visibility: visible;
    font-size: 18px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const DataInput = styled("input")`
  padding: 8px 14px;
  font-size: 0.85rem;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  &:focus-visible {
    outline: 0px solid crimson;
  }
  &::-webkit-calendar-picker-indicator {
    visibility: visible;
    font-size: 18px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 3px;
  }
`;
