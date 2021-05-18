import React, { useReducer, useState } from "react";
import BookablesList from "../Bookables/BookableList";
import Bookings from "./Bookings";

const BookingsPage = () => {
  const [bookable, setBookable] = useState<any>(null);

  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
};

export default BookingsPage;
