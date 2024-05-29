import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
   root: {
      margin: 0,
      padding: "0",
      // display: "flex",
      borderBox: "box",
   },

   content: {
      // minHeight: "calc(100vh - 70px)",
      // paddingBlock: "1rem",
      // paddingInline: "46px",
      // width: "calc(100vw - 245px)",
      width: "100%",
   },

   floatingButton: {
      position: "fixed",
      right: 0,
      bottom: 0,
      zIndex: 500000,

      "& button": {
         backgroundColor: "#D80032",
         outline: "none",
         border: "none",
         width: "50px",
         height: "50px",
         borderRadius: "100%",
         marginRight: "10px",
         color: "#fff",
         marginBottom: "10px",
         boxShadow:
            " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
      },

      "& button:hover": {
         backgroundColor: "#C70039",
      },
   },
}));

export default useStyles;
