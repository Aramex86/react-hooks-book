import React, { useState } from "react";
import { bookables } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

const BookableList = () => {
  const [bookableIndex, setBookableIndex] = useState(1);
  const [group, setGroup] = useState("Kit");

  const groups = Array.from(new Set(bookables.map((b) => b.group)));

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  console.log(bookableIndex);
  console.log(group);

  //HARD-CODE
  // let bookableIndex = 1;

  // const changeBookable=(selectedIndex:number)=>{
  //     bookableIndex = selectedIndex;
  //     console.log(selectedIndex)
  // }

  return (
    <>
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        {groups.map((g) => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
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
    </>
  );
};

export default BookableList;
