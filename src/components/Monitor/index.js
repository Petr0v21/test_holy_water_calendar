import React from "react";
import styled from "styled-components";
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../helpers/constants";
import {
  DatePicker,
  OpenFullFormButton,
  TextWrapper,
  TitleWrapper,
} from "../../styled-components";

const DivWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
  position: relative;
`;

const ButtonsWrapper = styled("div")`
  display: flex;
  align-items: center;
  gap: 1%;
`;

const DateText = styled("div")`
  width: 225px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const ButtonWrapper = styled("button")`
  border: unset;
  background-color: ${(props) => (props.unPressed ? "#27282A" : "#565759")};
  border: 1px solid #565759;
  height: 20px;
  border-radius: 4px;
  color: ${(props) => (props.unPressed ? "#a4a6a9" : "#E6E6E6")};
  outline: unset;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Monitor = ({
  today,
  prevHandler,
  nextHandler,
  setDisplayMode,
  displayMode,
  openFullForm,
  selectDate,
}) => (
  <DivWrapper>
    <OpenFullFormButton onClick={() => openFullForm()}>+</OpenFullFormButton>
    <ButtonsCenterWrapper>
      <ButtonWrapper
        unPressed={displayMode === DISPLAY_MODE_MONTH}
        onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}
      >
        Month
      </ButtonWrapper>
      <ButtonWrapper
        unPressed={displayMode === DISPLAY_MODE_DAY}
        onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}
      >
        Day
      </ButtonWrapper>
    </ButtonsCenterWrapper>
    <ButtonsWrapper>
      <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
      <DateText>
        {displayMode === DISPLAY_MODE_DAY ? (
          <TextWrapper>{today.format("DD")}</TextWrapper>
        ) : null}
        <TitleWrapper>{today.format("MMMM")}</TitleWrapper>
        <TextWrapper>{today.format("YYYY")}</TextWrapper>
      </DateText>
      <DatePicker
        type="month"
        onChange={(e) => selectDate(e.target.valueAsDate)}
      />
      {/* <TodayButton onClick={todayHandler}>Today</TodayButton> */}
      <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
    </ButtonsWrapper>
  </DivWrapper>
);

export { Monitor };
