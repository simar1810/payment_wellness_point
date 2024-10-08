"use client";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

/* const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&.Mui-error fieldset": {
      borderColor: "#00000060",
    },
  },
}));
 */
function DatePickerComponent({ mindate, label, value, setvalue, maxdate }) {
  console.log(value, "value");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className='w-full rounded-lg outline-none px-2 -py-3 text-[#00000080] font-semibold placeholder:font-medium'
        label={label}
        minDate={mindate ? mindate : null}
        value={value}
        format='DD/MM/YYYY'
        maxDate={maxdate}
        onChange={(date) => setvalue(date)}
        /*  slotProps={{
          textField: { component: CustomTextField },
        }} */
      />
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
