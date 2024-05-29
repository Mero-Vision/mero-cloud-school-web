import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  singleDiv: {
    display: "flex",
    flexDirection: "column",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "#201F37",
    fontSize: "11px",
    fontWeight: "500 !important",
    textTransform: "uppercase",
  },
  value: { color: "#383751", fontSize: "12px", fontWeight: "400 !important" },
}));

export default styles;
