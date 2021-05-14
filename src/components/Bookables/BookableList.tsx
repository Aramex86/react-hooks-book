import React, { useReducer, useState } from "react";
import { bookables, sessions, days } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import { reducer } from "./reducer";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables,
};

const BookableList = () => {
  //REDUCER
  const [state, dispatch] = useReducer(reducer, initialState);

  const { group, bookableIndex, bookables, hasDetails } = state;
  const bookablesInGroup = bookables.filter((b: any) => b.group === group);
  const groups = Array.from(new Set(bookables.map((b: any) => b.group)));
  const bookable = bookablesInGroup[bookableIndex];

  const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value,
    });
  };

  const setBookableIndex = (selectedIndex: number) => {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex,
    });
  };

  const nextBookable = () => {
    dispatch({
      type: "NEXT_BOOKABLE",
    });
  };

  const toggleDetails = () => {
    dispatch({
      type: "TOGGLE_HAS_DETAILS",
    });
  };

  console.log(state);

  return (
    <>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g: any) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b: any, i: any) => (
            <li key={b.id} className={i === bookableIndex ? "selected" : ""}>
              <button className="btn" onClick={() => setBookableIndex(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days?.sort().map((d: any) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s: any) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookableList;
