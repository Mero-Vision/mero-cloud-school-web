import { checkboxClasses, radioClasses } from "@mui/material";
import { createTheme, lighten } from "@mui/material/styles";
const mainColor = localStorage.getItem("themeColor") || "#4E8AF4";
const buttonSharedStyles = (color) => {
  return {
    color: color,
    background: lighten(color, 0.95),
    "&:hover": {
      background: color,
      color: "#fff",
    },
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  };
};
const darkButtonSharedStyles = (color1, color2) => {
  return {
    color: "#fff",
    background: color1,
    "&:hover": {
      background: color2,
    },
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  };
};
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
  palette: {
    primary: {
      main: mainColor,
      light: lighten(mainColor, 0.925),
      contrastText: "#fff",
    },
    yellow: {
      main: "#FF9E2A",
      dark: "#F25722",
      medium: "#FC7125",
      light: "#FFD89F",
      800: "#FC7125",
      900: "#F25722",
    },
    green: {
      main: "#34D399",
      dark: "#047857",
      light: "#ECFDF5",
    },
    blue: {
      main: "#4C7CE5",
      dark: "#496AD0",
      light: "#E1F5FF",
      lightFoot: "rgb(230 230 230)",
    },
    red: {
      main: "#EF4444",
      dark: "#DC2626",
      medium: "#F87171",
      light: "#FEE2E2",
      500: "#EF4444",
      600: "#DC2626",
    },
    grey: {
      900: "#121127",
      800: "#201F37",
      700: "#383751",
      600: "#4C4B63",
      500: "#6C6B80",
      400: "#D1D1DB",
      300: "#E5E5EB",
      200: "#F3F3F6",
      100: "#F9F9FB",
    },

    text: {
      main: "#121127",
      light: "#6C6B80",
      hover: "#007a6f",
      disabled: mainColor, // A darker shade of the primary color for disabled text
      active: "#4559BD",
    },
    primaryBtn: {
      main: "#017054",
      contrastText: "#fff",
    },
    grayBackground: {
      default: "#F7F8FA",
    },
    background: {
      default: "#FFF",
      light: "#F3FBFF",
      dark: "#E1F5FF",
    },
    common: {
      black: "#232323",
      white: "#fff",
    },
    input: {
      main: "#f6f6f6",
    },
    error: { main: "#FF3B3B" },
    info: { main: "#0063F7" },
    success: { main: "#06C270" },
    warning: { main: "#FC7125" },
  },
  typography: {
    fontSize: {
      default: "12px",
      small: "12px",
      medium: "14px",
      large: "18px",
    },
  },

  components: {
    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     label: {
    //       fontSize: "11px",
    //       color: "#4559BD",
    //       textDecoration: "underline",
    //     },
    //   },
    // },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#eee",
            width: "5px",
            height: "5px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#aaa",
            width: "5px",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "#E5E5EB",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontWeight: "500",
          fontSize: "12px",
          padding: "9px 11px !important",
          height: "34px !important",
        },
        contained: {
          "&:hover": {
            background: "#4C7CE5",
          },
        },
      },
      variants: [
        {
          props: { variant: "active" },
          style: {
            textTransform: "none",
            border: `1px solid #      width: "750px",
            `,
            color: "#06C270",
          },
        },
        {
          props: { variant: "inactive" },
          style: {
            textTransform: "none",
            border: `1px solid #DB2777`,
            color: "#DB2777",
          },
        },
        {
          props: {
            variant: "purple",
          },
          style: {
            ...buttonSharedStyles("#7A1AC6"),
          },
        },
        {
          props: {
            variant: "orange",
          },
          style: {
            ...buttonSharedStyles("#FC7125"),
          },
        },
        {
          props: {
            variant: "teal",
          },
          style: {
            ...buttonSharedStyles("#16AFA7"),
          },
        },
        {
          props: {
            variant: "grey",
          },
          style: {
            ...buttonSharedStyles("#9D9CAF"),
            "&:hover": {
              background: "##f6f6f6",
              color: "#9D9CAF",
            },
          },
        },
        {
          props: {
            variant: "lightBlue",
          },
          style: {
            ...buttonSharedStyles("#4E8AF4"),
          },
        },
        {
          props: {
            variant: "green",
          },
          style: {
            ...buttonSharedStyles("#06C270"),
          },
        },
        {
          props: {
            variant: "red",
          },
          style: {
            ...buttonSharedStyles("#DB2777"),
          },
        },
        {
          props: {
            variant: "blue",
          },
          style: {
            ...darkButtonSharedStyles("#4E8AF4", "#4C7CE5"),
          },
        },
        {
          props: {
            variant: "orange",
          },
          style: {
            ...darkButtonSharedStyles("#FF9E2A", "#ff8b00"),
          },
        },
        {
          props: {
            variant: "darkGreen",
          },
          style: {
            ...darkButtonSharedStyles("#00c770", "#05b267"),
          },
        },
        {
          props: {
            variant: "outlinedButton",
          },
          style: {
            color: "#496AD0",
            padding: "0px 10px",
            border: "1px solid #D1D1DB",
            fontSize: "13px",
            fontWeight: "400",
            background: "#fff",
            height: "30px",
            "& svg": {
              height: "17px",
              width: "17px",
              color: "#496AD0",
            },
          },
        },
        {
          props: {
            variant: "outlinedStyle",
          },
          style: {
            color: "#496AD0",
            padding: "2px 10px !important",
            border: "1px solid #D1D1DB !important",
            fontSize: "12px",
            fontWeight: "400",
            height: "25px !important",

            "& svg": {
              height: "13px",
              width: "13px",
            },
          },
        },
        {
          props: {
            variant: "colorOutlined",
          },
          style: {
            color: "#496AD0",
            padding: "0px 10px !important",
            fontSize: "11px",
            fontWeight: "600",
            background: "#E1F5FF",
            height: "24px !important",
            "&:hover": {
              background: "#d8f2ff",
            },
            "& svg": {
              height: "13px",
              width: "13px",
            },
          },
        },
        {
          props: {
            variant: "generateReportButton",
          },
          style: {
            color: "#496AD0",
            padding: "0px 10px !important",
            fontSize: "13px",
            fontWeight: "600",
            background: "#E1F5FF",
            height: "30px !important",
            "&:hover": {
              background: "#d8f2ff",
            },
          },
        },
        {
          props: {
            variant: "exportButton",
          },
          style: {
            color: "#fff",
            padding: "0px 10px !important",
            fontSize: "13px",
            fontWeight: "600",
            background: "#3FB887",
            height: "30px !important",
            "&:hover": {
              background: "#089536",
            },
          },
        },
        {
          props: {
            variant: "resetButton",
          },
          style: {
            color: "#6C6B80",
            padding: "0px 10px !important",
            fontSize: "13px",
            fontWeight: "600",
            background: "#f3f3f6",
            height: "30px !important",
            "&:hover": {
              background: "#eee",
            },
          },
        },
      ],
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          // maxHeight: "70vh",
          // marginLeft: "18px",
          overflowY: "auto",
          border: "1px solid #ddd",
          "& .MuiTable-root": {
            borderCollapse: "separate",
          },
          "& .MuiTableCell-stickyHeader": {
            backgroundColor: "#eee",
            borderBottom: `1px solid #ddd`,
            padding: "8px 20px",
            margin: "0px",
            fontWeight: "500",
            fontSize: "12px",
          },
        }),
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#4C7CE5",
          [`&.${checkboxClasses.checked}`]: {
            color: "#4C7CE5",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#4C7CE5",
          [`&.${radioClasses.checked}`]: {
            color: "#4C7CE5",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          // borderBottom: `2px solid ${theme.palette.primary.light}`,
          backgroundColor: "transparent",
          padding: "8px",
          margin: "0px",
          fontWeight: "500",
          fontSize: "14px",
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "8px 15px",
          margin: "0px",
          fontSize: "12px",
          "&.title": {
            cursor: "pointer",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          },
        }),
        footer: ({ theme }) => ({
          fontWeight: "700",
          color: "#4559BD",
        }),
      },
    },
    MuiTableFooter: {
      styleOverrides: {
        root: ({ theme }) => {
          console.log({ theme });
          return {
            fontSize: "16px",
            fontWeight: "600",
            position: "sticky",
            bottom: 0,
            zIndex: 100,
            background: "#fff",
          };
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9F9FB !important",
          outline: "none",
          border: "none",
          borderRadius: "3px",
          fontSize: "12px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          outline: "none",
          border: "none",
          borderRadius: "3px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          fontSize: 14,
        },
        listbox: {
          paddingBlock: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: "9px 16px",
          fontSize: "13px",
          // height: "30px",
        },
        avatar: {
          width: "17px",
          height: "17px",
        },
      },
      variants: [
        {
          props: { variant: "active" },
          style: {
            backgroundColor: "#F87171",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              background: "#EF4444",
            },
          },
        },
        {
          props: { variant: "inactive" },
          style: {
            backgroundcolor: "#fff",
            color: "#383751",
            fontweight: 500,
          },
        },
        {
          props: { variant: "activeFloor" },
          style: {
            backgroundColor: "#FF9E2A",
            color: "#fff",
            fontWeight: 600,
            "&:hover": {
              background: "#F25722",
            },
          },
        },
        {
          props: { variant: "inactiveFloor" },
          style: {
            backgroundcolor: "#fff",
            color: "#383751",
            fontweight: 500,
          },
        },
        {
          props: { variant: "inactive-transparent" },
          style: {
            color: "#9D9CAF",
            fontweight: 500,
            border: "1px solid #9D9CAF",
            background: "transparent",
          },
        },
        {
          props: { variant: "warning" },
          style: {
            backgroundColor: "#F87171",
            color: "#fff",
            fontWeight: 500,
            fontSize: 14,
            boxShadow: "0px 8px 20px 0px rgba(255, 199, 199, 0.50)",
            cursor: "pointer",
            "&:hover": {
              background: "#EF4444",
            },
          },
        },
        {
          props: { variant: "warning-outlined" },
          style: {
            backgroundColor: "#fff",
            color: "#EF4444",
            border: `1px solid #EF4444`,
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            "&:hover": {
              color: "#EF4444",
              borderColor: "#EF4444",
            },
          },
        },
      ],
    },
    MuiSwitch: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: 28,
          height: 16,
          padding: 0,
          display: "flex",

          "& .MuiSwitch-switchBase": {
            padding: 1.8,
            "&.Mui-checked": {
              transform: "translateX(12px)",
              color: "#fff !important",
              "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "#4C7CE5 !important",
              },
            },
          },
          "& .MuiSwitch-thumb": {
            // boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(["width"], {
              duration: 200,
            }),
          },
          "& .MuiSwitch-track": {
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: "#E5E5EB !important",
            boxSizing: "border-box",
          },
        }),
      },
    },
  },
});
export default theme;
