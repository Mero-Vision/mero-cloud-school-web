import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: "2rem",
    "& .MuiButton-root": {
      color: theme.palette.text.main,
    },
    marginBlock: "10px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    fontSize: "16px",
    fontWeight: "600",
    color: theme.palette.text.main,
    textTransform: "capitalize",
  },
  right: {
    display: "flex",
    alignItems: "center",
    columnGap: "1rem",
    "& .companyDiv": {
      background: "#fff",
      padding: "0px 13px",
      borderRadius: "5px",
      border: "1px solid #D1D1DB",
    },
    "& .login": { fontSize: "9px", color: "#6C6B80", marginBottom: "2px" },
    "& .company": {
      display: "flex",
      alignItems: "center",
      columnGap: "4px",
    },
    "& .name": {
      fontWeight: "500",
      fontSize: "13px",
    },
  },
  breadcrumbs: {
    fontSize: "12px",
  },
  navLinkWrapper: {
    display: "flex",
    height: "100%",
    // columnGap: "2rem",
    // gap: "1rem",
    rowGap: "0.5rem",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "10px 0px",

    "& > a": {
      color: theme.palette.text.light,
      textDecoration: "none",
      borderRight: "2px solid #48484860",
      padding: "0px 10px",
      "&:last-child": {
        borderRight: "none",
      },

      "& > p": {
        fontSize: theme.typography.fontSize.small,
        fontWeight: "800",
      },
    },
  },

  active: {
    color: `${theme.palette.primary.main} !important`,
  },

  othersWrapper: {
    padding: "0px",
    margin: "0px",
    "& > a": {
      color: theme.palette.text.main,
      textDecoration: "none",

      "& > p": {
        fontSize: theme.typography.fontSize.small,
        fontWeight: "800",
      },
    },
  },
}));

export default useStyles;
