import React, { useReducer, useRef, useState } from "react";
import reducer from "./reducer";
import { getWeek } from "../../Utils/utils";
import {
  FaChevronLeft,
  FaCalendarDay,
  FaChevronRight,
  FaCalendarCheck,
} from "react-icons/fa";

const WeekPicker = ({ date }: any) => {
  const [week, dispatch] = useReducer(reducer, date, getWeek);
  const [dateText, setDateText] = useState("2020-06-24");

  // const textboxRef = useRef<any>();

  function goToDate() {
    dispatch({
      type: "SET_DATE",
      // payload: textboxRef.current.value,
      payload: dateText,
    });
  }

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            // ref={textboxRef}
            placeholder="e.g. 2020-09-02"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />

          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
};

export default WeekPicker;
