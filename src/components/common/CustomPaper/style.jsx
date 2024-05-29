import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",

    "&:focus-visible": {
      outline: "none",
    },
  },
  modalHeader: {
    // position: "sticky",
    // top: 0,
    // zIndex: 100,
    backgroundColor: "#fff",
    padding: "11px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",

    "& .MuiTypography-root": {
      fontSize: "15px",
      textTransform: "capitalize",
      fontWeight: "600",
    },
  },
  modalTitle: {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    "& svg": {
      color: "#496AD0 !important",
      fontSize: "16px",
    },
  },
  icon: {
    background: theme.palette.background.dark,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    padding: "5px",
  },
  rotate: {
    transition: "transform 0.3s ease",
    transform: "rotate(0deg)", // Initial rotation value
    "&:hover": {
      transform: "rotate(90deg)", // Rotation value on hover
    },
  },
  printButton: {
    color: "#383751 !important",
    borderColor: "#D1D1DB !important",
  },
}));

export default styles;
