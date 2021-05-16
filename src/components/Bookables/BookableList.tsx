import React, { useEffect, useReducer, useState } from "react";
import { sessions, days } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import { reducer } from "./reducer";
import Spinner from "../UI/Spinner";
import { getData } from "../../Utils/utils";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  hasDetails: true,
  bookables: [],
  isLoading: true,
  error: false,
};

const BookableList = () => {
  //REDUCER
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, error, hasDetails } = state;
  const { group, bookableIndex, bookables } = state;
  const bookablesInGroup = bookables.filter((b: any) => b.group === group);
  const groups = Array.from(new Set(bookables.map((b: any) => b.group)));
  const bookable = bookablesInGroup[bookableIndex];

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
    getData("http://localhost:301/bookables")
      .then((bookables) =>
        dispatch({
          type: "FETCH_BOOKABLES_SUCCESS",
          payload: bookables,
        })
      )
      .catch((error) =>
        dispatch({
          type: "FETCH_BOOKABLES_ERROR",
          payload: error,
        })
      );
  }, []);

  console.log(state);
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


  if(error) return <p>{error.message}</p>

  if(isLoading) return <p><Spinner/> Loading bookables...</p>

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
