import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  printDiv: {
    background: "#f0f4ff",
    display: "flex",
    flexDirection: "column",
    rowGap: "1.5rem",
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
      alignItems: "center",
      textAlign: "right",
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
