import { Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box, Chip, FormHelperText, InputLabel } from "@mui/material";
import { useRef } from "react";

function HashInputChips({
  name,
  control,
  label,
  defaultValue = [],
  errors,
  title,
  required,
  sx,
  placeholder,
  limitTags = 2,
  disabled,
  // watch,
}) {
  // const classes = styles();
  const inputRef = useRef();

  const pressEnter = (event) => {
    let keyEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: "Enter",
    });
    inputRef.current.dispatchEvent(keyEvent);
  };

  return (
    <Box
      sx={{
        ...sx,
        "& .MuiAutocomplete-input": {
          padding: "0 !important",
        },
        "& .MuiOutlinedInput-root": {
          padding: "0 9px !important",
          minHeight: "37.5px",
        },
        "& .MuiAutocomplete-popper": {
          "& div": {
            fontSize: "14px",
          },
        },
        "& .MuiButtonBase-root": {
          "& span": {
            fontSize: "11px",
          },
        },
      }}
      className="hash-input"
    >
      {title && (
        <Box sx={{ display: "flex", columnGap: "0.1rem", mb: "3px" }}>
          <InputLabel className="title">{title} </InputLabel>
          <InputLabel style={{ color: "red" }}>{required && " *"}</InputLabel>
        </Box>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            disableClearable
            limitTags={limitTags}
            id="tags-filled"
            value={value || []}
            disabled={disabled}
            ref={inputRef}
            sx={{ "& .MuiChip-root": { margin: "3px" } }}
            // trigger Enter button when space button is pressed
            onKeyDown={(event) => {
              if (
                event.code === "Space" &&
                Boolean(event.target.value.trim())
              ) {
                event.preventDefault();
                let inputValue = event.target.value.trim();
                // only accept unique values
                if (value.indexOf(inputValue) === -1) {
                  value = [...value, inputValue];
                }
                pressEnter();
                return onChange(value);
              }
            }}
            onChange={(event, selectedOptions) => {
              return onChange(selectedOptions);
            }}
            options={[]}
            // className={classes.autoCompleteText}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) =>
                disabled ? (
                  <Chip
                    key={index}
                    label={option}
                    // {...getTagProps({ index })}
                  />
                ) : (
                  <Chip
                    key={index}
                    label={option}
                    onDelete={() =>
                      onChange(value.filter((value) => value !== option))
                    }
                    // {...getTagProps({ index })}
                  />
                ),
              )
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                placeholder={value ? "" : placeholder}
              />
            )}
          />
        )}
      />

      {errors[name] && (
        <FormHelperText
          sx={{
            textTransform: "capitalize",
            color: "red !important",
            fontSize: "10px",
            marginTop: "5px",
          }}
          error={true}
        >
          {errors[name]?.message}
        </FormHelperText>
      )}
    </Box>
  );
}

export default HashInputChips;
