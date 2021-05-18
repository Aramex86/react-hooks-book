import React, { useCallback, useReducer, useState } from "react";
import BookableList from "./BookableList";
import BookablesDetails from "./BookablesDetails";

import { reducer } from "./reducer";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: false,
  error: false,
};

const BookablesView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [bookable, setBookable] = useState<any>();

  const updateBookable = useCallback((selected: any) => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, []);

  return (
    <>
      <BookableList bookable={bookable} setBookable={updateBookable} />
      <BookablesDetails bookable={bookable} />
    </>
  );
};

export default BookablesView;
