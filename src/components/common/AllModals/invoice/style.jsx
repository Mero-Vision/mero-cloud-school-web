import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  mainSection: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    "& > *": {
      lineHeight: "normal !important",
    },
    "& .title": {
      color: "#000",
      textTransform: "capitalize",
      fontSize: "14px",
      fontWeight: "500",
    },
    "& .position": {
      fontSize: "11px",
    },
    "& .infoDiv": {
      display: "flex",
      alignItems: "center",
      columnGap: "5px",
      "& > *": {
        color: "#6C6B80",
        fontSize: "12px",
        fontWeight: "300",
      },
      "& svg": {
        fontSize: "13px",
      },
    },
  },
}));

export default styles;
