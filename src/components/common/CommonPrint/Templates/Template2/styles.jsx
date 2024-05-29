import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  printDiv: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
    fontSize: "12px",
    "& .bankDetails": {
      textAlign: "right",
      "& > *": {
        fontSize: "13px",
        fontWeight: "500",
      },
    },
    "& .bold": {
      fontWeight: "500",
    },
    "& .header, & .details": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .header": {
      background: "#0A2D91",
      alignItems: "center",
      textAlign: "right",
      color: "#fff",
      "& img": {
        height: "50px",
        width: "50px",
        objectFit: "contain",
      },
    },
  },
  totalBoxContainer: {
    padding: "15px 0",
    height: "100%",
    borderRadius: "4px",
    "& .MuiTypography-root": { fontSize: "13px" },
  },
  totalItems: {
    display: "flex",
    flexDirection: "column",
    rowGap: "5px",
  },
  singleItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grandTotal: {
    fontSize: "13px",
    "& .MuiTypography-root": {
      fontWeight: 500,
    },
  },
}));

export default styles;
