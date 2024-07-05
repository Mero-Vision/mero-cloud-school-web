import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100dvh",
    background: "#F9F9FB",
  },
  paper: {
    backgroundColor: "white",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
    width: "500px",
    height: "400px",
    borderRadius: "2px",
  },
  loginContainer: {
    background: "#F9F9FB",
    height: "100dvh",
    overflow: "auto",
    position: "relative",
    "& .left": {
      position: "absolute",
      bottom: 0,
      zIndex: 1,
      "& img": {
        width: "100%",
      },
    },
  },
  loginContents: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "35px 85px",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
    },
    zIndex: 2,
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& .logoDiv": {
      display: "flex",
      columnGap: "7px",
      alignItems: "center",
      "& img": {
        height: "32px",
        width: "32px",
        objectFit: "contain",
      },
      "& .title": {
        color: "#121127",
        fontSize: "16px ",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
          fontSize: "11px",
        },
      },
    },
    "& .singupDiv": {
      display: "flex",
      columnGap: "12px",
      alignItems: "center",
      fontSize: "15px",
      color: "#201F37",
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
        columnGap: "3px",
      },
      "& .singup": {
        color: "#4559BD",
        textDecoration: "underline",
        cursor: "pointer",
      },
    },
  },
  mainDiv: {
    // height: "max-content",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    rowGap: "30px",
    textAlign: "center",
  },
  companyTitle: {
    color: "#201F37",
    fontSize: "32px",
    fontWeight: "700 !important",
    paddingBottom: "10px",
  },
  title: {
    color: "#878896",
    fontSize: "22px",
    fontWeight: "600 !important",
  },
  addCompanyDiv: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    columnGap: "5px",
    marginTop: "14px",
    color: "#6C6B80",
    "& :nth-child(2)": {
      color: "#339AA2",
      textDecoration: "underline",
      cursor: "pointer",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0px",
    },
  },
  companyCards: {
    minHeight: "250px",
    maxHeight: "380px",
    overflowY: "auto",
    width: "1150px",
    padding: "1rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      paddingInline: 0,
    },
  },
  singleCard: {
    height: "100px",
    background: "#fff",
    boxShadow: "0px 11px 18px 0px rgba(47, 118, 255, 0.10)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "5px 15px",
    // [theme.breakpoints.down("md")]: {
    //   width: "150px",
    // },
    "& .branchTypeButtonBoxWrap": {
      display: "flex",
      gap: "5px",
      alignItems: "center",

      "& .branchTypeButtonBox": {
        display: "flex",
        justifyContent: "end",
        width: "100%",
        "& .branchTypeButton": {
          backgroundColor: "#4C7CE5",
          fontSize: "10px",
          margin: "0px 2px",
          padding: "5px 8px",
          borderRadius: "50px",
          color: "#fff",
          border: "none",
          cursor: "initial",
          "&:hover": {
            backgroundColor: "#4C7CE5",
          },
        },
      },
    },
  },
  hoverDiv: {
    borderRadius: "6px",
    border: "2px solid #fff",
    transition: "200ms all ease-in-out",
    "&:hover": { borderColor: "#3EC4D5" },
    position: "relative",
    "& .options": {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 1000,
      visibility: "hidden",
      "& svg": {
        fontSize: "16px",
      },
    },
    "& .updatePlan": {
      position: "absolute",
      bottom: "-10px",
      right: 0,
      left: 0,
      zIndex: 1000,
    },

    "&:hover .options": {
      visibility: "visible",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  companyDetails: {
    cursor: "pointer",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    columnGap: "1rem",
    // gap: "10px",
    // flexDirection: "column",
    // alignItems: "center",
    // rowGap: "16px",
    "& .nameBox": {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "100%",
    },
    "& .MuiAvatar-root": {
      height: "50px",
      minWidth: "50px",
      maxWidth: "85px",
    },
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "contain",
    },
    "& .name": {
      color: "#201F37",
      fontWeight: "500",
      fontSize: "14px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      marginBottom: "3px",

      // maxWidth: "10rem",
    },
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiTypography-root": {
      color: "#4C4B63 !important",
      fontSize: "14px",
      fontWeight: "300",
      [theme.breakpoints.down("sm")]: {
        fontSize: "11px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  form: {
    textAlign: "start",
    height: "600px",
    width: "485px",
    display: "flex",
    flexDirection: "column",
    rowGap: "40px",
    "& .MuiInputLabel-root": {
      fontWeight: "600 !important",
    },
    "& .MuiInputBase-root": {
      borderColor: "#D1D1DB !important",
      background: "#fff !important",
    },

    "& .formTitleDiv": {
      marginBottom: "36px",
      "& .formTitle": {
        fontSize: "23px",
        color: "#121127",
        fontWeight: "600 !important",
      },
    },
    "& .checkBox": {
      "& .MuiTypography-root": {
        color: "#6C6B80",
        fontSize: "13px",
      },
    },
    [theme.breakpoints.down("md")]: {
      width: "auto",
    },
  },
  stepTitle: {
    color: "#121127",
    fontSize: "20px",
    fontWeight: 600,
  },
  number: {
    color: "#9D9CAF",
    fontSize: "14px",
    fontWeight: 400,
  },
  step: {
    cursor: "pointer",
    borderRadius: "99999rem",
    background: "#E5E5EB !important",
    "& .MuiLinearProgress-bar": {
      background: "#4C7CE5",
      height: "5px",
      transition: "100ms !important",
    },
  },
  fileUpload: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    border: "1px dashed #9D9CAF",
    borderRadius: "2px",
    padding: "13px 6px",
    rowGap: "12px",
    cursor: "pointer",
    background: "#fff",
    transition: "200ms all ease-in-out",
    "& svg": {
      height: "20px",
      width: "20px",
      color: "#6C6B80",
    },
    "& > *": { fontSize: "11px", color: "#496AD0" },
    "&:hover": {
      background: "#F9F9FB",
    },
  },
  searchbar: {
    width: "435px",
    display: "flex",
    alignItems: "center",
    position: "relative",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
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
  dashboardButton: {
    width: "100%",
    background: "#F9F9FB !important",
    border: "1px solid #D1D1DB !important",
    padding: "10px !important",
    color: "#4C4B63 !important",
    fontSize: "14px !important",
    fontWeight: "400 !important",
    transition: "200ms all ease-in-out",

    "&:hover": {
      background: "#ECECEF !important",
    },
  },
  noCompanyDiv: {
    boxShadow: "0px 20px 50px 0px rgba(18, 17, 39, 0.08)",
    background: "#fff",
    borderRadius: "6px",
    width: "260px",
    height: "260px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    rowGap: "20px",
  },
}));

export default styles;
