import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: "3px",
      overflow: "hidden",
      boxShadow: theme.shadows[5],
      "&:focus-visible": {
         outline: "none",
      },
   },
   modalHeader: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backgroundColor: theme.palette.primary.main,
      padding: "1rem 2rem",
      color: "#F9FAFD",
      display: "flex",
      justifyContent: "space-between",
      "&:nth-child(1)": {
         cursor: "pointer",
      },
   },
}));

export default styles;
