import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F9F9FB",
    height: "100vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: "1rem",
    width: "630px",
  },
  title: {
    color: "#201F37",
    fontSize: "25px",
    fontWeight: "700 !important",
  },

  searchbar: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
  },

  inputDiv: {
    width: "100%",

    "& input": {
      width: "100%",
      border: "none",
      outline: "none",
      borderRadius: "0px !important",
      "&::placeholder": {
        color: "#9D9CAF",
      },
    },
  },
  searchIcon: {
    background: "#599BF9",
    height: "100%",
    position: "absolute",
    right: 0,
    display: "grid",
    placeItems: "center",
    paddingInline: "10px",
    color: "#fff",
  },
  companyContainer: {
    width: "100%",
    height: "400px",
    overflowY: "auto",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
    backgroundColor: "#fff",
  },
  singleCompany: {
    padding: "10px 25px",
    borderBottom: "1px solid #E5E5EB",
    cursor: "pointer",
    transition: "200ms all ease-in-out",
    "&:hover": {
      background: "#E5F6FF",
    },
  },
  companyName: {
    color: "#464F60",
    fontSize: "13px",
    fontWeight: "400 !important",
  },
  dashboardButton: {
    width: "100%",
    background: "#F9F9FB !important",
    border: "1px solid #E5E5EB !important",
    padding: "10px !important",
    color: "#496AD0 !important",
    fontSize: "14px !important",
    fontWeight: "400 !important",
    transition: "200ms all ease-in-out",

    "&:hover": {
      background: "#ECECEF !important",
    },
  },
}));

export default styles;
