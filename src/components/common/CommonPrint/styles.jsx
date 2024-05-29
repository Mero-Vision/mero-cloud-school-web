import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    padding: "20px 50px 50px 50px",
    background: "#fff",
  },
  divContainer: {
    boxShadow: "0px 4px 22px 0px rgba(0, 0, 0, 0.05)",
    padding: "24px",
  },
  templates: {
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    alignItems: "center",
    paddingBlock: "1rem",
    "& .imageDiv": {
      cursor: "pointer",
      "& img": {
        border: "2px solid #E5E5EB",
        height: "225px",
        width: "180px",
        objectFit: "contain",
        transition: "200ms all ease-in-out",
        "&:hover": {
          border: "2px solid #aaa",
        },
      },
    },
  },
}));

export default styles;
