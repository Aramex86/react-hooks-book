import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import { getData } from "../../Utils/utils";

export interface Bookable {
  id: number;
  group: string;
  title: string;
  notes: string;
  days: any;
  sessions: any;
}

const BookableList = ({
  bookable,
  setBookable,
}: {
  bookable: Bookable;
  setBookable: any;
}) => {
  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group;

  const bookablesInGroup = bookables.filter(
    (b: any) => b.group === group
  ) as Array<any>;
  const groups = Array.from(new Set(bookables.map((b: any) => b.group)));
  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })

      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [setBookable]);

  function changeGroup(e: any) {
    const bookablesInSelectedGroup = bookables.filter(
      (b: any) => b.group === e.target.value
    );
    setBookable(bookablesInSelectedGroup[0]);
  }


  function nextBookable() {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b) => (
          <li key={b.id} className={b.id === bookable.id ? "selected" : ""}>
            <button className="btn" onClick={() => setBookable(b)}>
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
        >
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default BookableList;
