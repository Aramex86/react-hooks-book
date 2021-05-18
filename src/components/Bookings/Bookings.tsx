import React from 'react'
import {useReducer, useState} from "react";
import {getWeek} from "../../Utils/utils";

import WeekPicker from "./WeekPiker";
import BookingsGrid from "./BookingGrid";
import BookingDetails from "./BookingDetails";

import reducer from "./reducer";

const Bookings = ({bookable}:any) => {
    const [week, dispatch] = useReducer(
        reducer, new Date(), getWeek
      );
    
      const [booking, setBooking] = useState(null);
    
      return (
        <div className="bookings">
          <div>
            <WeekPicker
              dispatch={dispatch}
            />
    
            <BookingsGrid
              week={week}
              bookable={bookable}
              booking={booking}
              setBooking={setBooking}
            />
          </div>
    
          <BookingDetails
            booking={booking}
            bookable={bookable}
          />
        </div>
      );
}

export default Bookings
