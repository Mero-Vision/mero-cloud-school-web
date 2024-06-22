import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   commonCenterDiv: {
      padding: "6rem",
      width: "100%",
      [theme.breakpoints.down("md")]: {
         padding: "6rem 1rem",
      },
   },
   commonCenterDivTitleBox: {
      width: "100%",

      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "20px",
      "& .commonCenterDivTitle": {
         fontSize: "44px",
         fontWeight: 500,
         width: "40%",
         textAlign: "center",
         lineHeight: "1.2",
         color: "#0D48A5",
         [theme.breakpoints.down("lg")]: {
            width: "60%",
         },
         [theme.breakpoints.down("md")]: {
            width: "80%",
         },
         [theme.breakpoints.down("sm")]: {
            width: "100%",
         },
      },
      "& .commonCenterDivSubtitle": {
         fontSize: "16px !important",
         fontWeight: 400,
         width: "40%",
         textAlign: "center",
         lineHeight: "1.2",
         color: "#a1aaa6",
         [theme.breakpoints.down("lg")]: {
            width: "60%",
         },
         [theme.breakpoints.down("md")]: {
            width: "80%",
         },
         [theme.breakpoints.down("sm")]: {
            width: "100%",
         },
      },
   },
}));
export default styles;
