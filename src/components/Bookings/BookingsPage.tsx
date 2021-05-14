import React from "react";
import WeekPicker from "./WeekPiker";

const BookingsPage = () => {
  return (
    <main className="bookings-page">
      <p>Bookings!</p>
      <WeekPicker date={new Date()} />
    </main>
  );
};

export default BookingsPage;
