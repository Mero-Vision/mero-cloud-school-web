import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  div: {
    "& .MuiFormControlLabel-label": {
      textTransform: "capitalize",
    },
    marginBottom: "2rem",
  },
  singleContainer: {
    display: "flex",
    columnGap: "20px",
    flexWrap: "wrap",
    background: "#fff",
    padding: "1rem",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
  },
  checkBox: {
    display: "flex",
    // columnGap: "2px",
    alignItems: "center",
    "& input": { cursor: "pointer" },
    "& .MuiTypography-root": { textTransform: "capitalize", cursor: "pointer" },
    paddingBlock: "1rem",
  },
}));

export default styles;
