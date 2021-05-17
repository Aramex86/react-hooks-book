import React, { useReducer } from "react";
import BookableList from "./BookableList";
import BookablesDetails from "./BookablesDetails";

import {reducer} from "./reducer";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: false,
  error: false
};


const BookablesView = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const bookablesInGroup = state.bookables.filter(
     (b:any) => b.group === state.group
    );
    const bookable = bookablesInGroup[state.bookableIndex];
  return (
    <>
      <BookableList state={state} dispatch={dispatch}/>
      <BookablesDetails bookable={bookable}/>
    </>
  );
};

export default BookablesView;
