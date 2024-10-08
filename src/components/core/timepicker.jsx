"use client";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
function TimePickerComponent({ setTime, value }) {
  const timeValue = value ? dayjs(value, "HH:mm") : null;
  return value ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        value={timeValue}
        className=' w-full '
        // defaultValue={dayjs(joiningDate)}
        closeOnSelect={true}
        format=' hh:mm A'
        onChange={(e) => setTime(e)}
      />
    </LocalizationProvider>
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        className=' w-full '
        // defaultValue={dayjs(joiningDate)}
        closeOnSelect={true}
        format=' hh:mm A'
        onChange={(e) => setTime(e)}
      />
    </LocalizationProvider>
  );
}

export default TimePickerComponent;
