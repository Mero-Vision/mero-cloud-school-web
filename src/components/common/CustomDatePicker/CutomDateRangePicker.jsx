import { Box, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";

const CustomDateRangePicker = ({
  label,
  name,
  control,
  errors,
  classnames = "",
  minDate,
  format,
  required,
  ...props
}) => {
  return (
    <Box
      className={`${classnames} datepicker`}
      sx={{
        "& .rmdp-week-day": {
          color: (theme) => theme.palette.primary.main,
        },
        "& .rmdp-day.rmdp-today": {
          "& span": {
            backgroundColor: (theme) => theme.palette.secondary.main,
          },
        },
      }}
    >
      <Controller
        control={control}
        errors={errors}
        name={name}
        render={({ field: { onChange, value, name } }) => {
          return (
            <>
              <DatePicker
                value={value || ""}
                onChange={(date) => {
                  // date = date.map((date) => date.toDate());
                  date = date.map((date) =>
                    date.format(format || "YYYY-MM-DD"),
                  );
                  return onChange(date);
                }}
                range
                rangeHover
                numberOfMonths={2}
                minDate={minDate || ""}
                render={<CustomRangeInput label={label} required={required} />}
              />
            </>
          );
        }}
      ></Controller>

      {errors?.message && (
        <FormHelperText
          error={true}
          sx={{ color: "red !important", fontSize: "10px", marginTop: "5px" }}
        >
          {errors?.message}
        </FormHelperText>
      )}
    </Box>
  );
};

function CustomRangeInput({ onFocus, value, separator, label, required }) {
  let values = value.split(separator);

  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Box>
        <InputLabel sx={{ marginBottom: "3px" }}>{label?.[0]}</InputLabel>
        <OutlinedInput
          onFocus={onFocus}
          value={values[0]}
          readOnly
          placeholder={label?.[0]}
        />
      </Box>
      <Box>
        <InputLabel sx={{ marginBottom: "3px" }}>{label?.[1]}</InputLabel>
        <OutlinedInput
          onFocus={onFocus}
          value={values[1]}
          readOnly
          placeholder={label?.[1]}
        />
      </Box>
    </Box>
  );
}

export default CustomDateRangePicker;
