import React, { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import { getData } from "../../Utils/utils";

const BookableList = ({ state, dispatch }: any) => {
  //REDUCER

  const { group, bookableIndex, bookables } = state;
  const { isLoading, error } = state;

  const groups = Array.from(new Set(bookables.map((b: any) => b.group)));
  const bookablesInGroup = bookables.filter((b: any) => b.group === group);

  const nextButtonRef = useRef<any>();
  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });
    getData("http://localhost:3001/bookables")
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
  }, [dispatch]);

  // useEffect(() => {
  //   timerRef.current = setInterval(() => {
  //     dispatch({ type: "NEXT_BOOKABLE" });
  //   }, 3000);

  //   return stopPresentation;
  // }, []);

  // function stopPresentation() {
  //   clearInterval(timerRef.current);
  // }

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
    nextButtonRef.current.focus();
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

  if (error) return <p>{error.message}</p>;

  if (isLoading)
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );

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
          <button
            className="btn"
            onClick={nextBookable}
            autoFocus
            ref={nextButtonRef}
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
    </>
  );
};

export default BookableList;
