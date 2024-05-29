import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  printDiv: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1.5rem",
    fontSize: "13px",
    "& .bankDetails": {
      textAlign: "right",
      "& > *": {
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
      fontSize: "12px",
      alignItems: "center",
      textAlign: "right",
      "& img": {
        height: "50px",
        width: "50px",
        objectFit: "contain",
      },
    },
    "& .MuiTableHead-root": {
      borderBlock: "1px solid #ddd",
    },
    "& .MuiTableCell-root": {
      paddingInline: "0 !important",
    },
  },
  totalBoxContainer: {
    padding: "15px 0",
    height: "100%",
    borderRadius: "4px",
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
    "& .MuiTypography-root": {
      fontWeight: 500,
    },
  },
}));

export default styles;
