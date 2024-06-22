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
      background: "#ECF4F9",
      height: "100dvh",
      overflow: "auto",
      position: "relative",
      "& .left": {
         position: "absolute",
         bottom: 0,
         zIndex: 1,
      },
      "& .right": {
         position: "absolute",
         bottom: 0,
         right: 0,
         zIndex: 1,
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
         columnGap: "11px",
         alignItems: "center",
         fontSize: "15px",
         [theme.breakpoints.down("sm")]: {
            fontSize: "11px",
            columnGap: "3px",
         },
         color: "#201F37",
         "& .singup": {
            color: "#4559BD",
            textDecoration: "underline",
            cursor: "pointer",
         },
      },
   },
   body: {
      minWidth: "auto !important",
   },
   mainDiv: {
      backgroundColor: "#F5F8FE",
      height: "100dvh",
      // height: "max-content",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      width: "auto",
      // paddingTop: "50px",
      [theme.breakpoints.down("md")]: {
         // paddingTop: "80px",
      },
   },
   formDiv: {
      padding: "0px 130px",
      // width: "1130px",
      display: "flex",
      // alignItems: "center",
      columnGap: "105px",
      [theme.breakpoints.down("lg")]: {
         padding: "0px 60px",
         // width: "100%",
      },
      [theme.breakpoints.down("md")]: {
         padding: "0px 30px",
         // width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
         padding: "0px 20px",
         // width: "100%",
      },
   },
   grid2: {
      background:
         "linear-gradient(120deg, #020c1c, #0D48A5, #2a77ed) !important",
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      position: "relative",
      [theme.breakpoints.down("lg")]: {
         // padding: "50px 0px",
         height: "100dvh",
      },
   },
   grid2Wrap: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      // padding: "0px 130px 0px 130px",
   },
   infoCard: {
      display: "flex",
      justifyContent: "space-between",
      width: "400px",
      alignItems: "center",
      padding: "15px 0px",
      borderBottom: "1px solid rgba(249, 249, 249, 0.14)",
      cursor: "pointer",

      "&:last-child": {
         borderBottom: "none !important",
      },
      "&:hover $arrowIcon": {
         transition: "0.2s ease-in-out", // Adding transition for smooth effect
         marginRight: "-10px",
      },

      [theme.breakpoints.down("sm")]: {
         width: "300px",
         padding: "25px 0px",
      },
   },

   infoCardG1: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
   },
   arrowIcon: {
      color: "rgba(249, 249, 249, 0.50)",
      fontSize: "18px",
      transition: "0.2s ease-in-out", // Adding transition for smooth effect
   },
   iconBox: {
      width: "40px",
      height: "40px",
      backgroundColor: "rgba(249, 249, 249, 0.14) !important",
      display: "flex",
      justifyContent: "center",
      // width: "100%",
      alignItems: "center",
      borderRadius: "2px",
   },
   iconBoxImg: {
      color: "#fff",
   },

   grid2BoxTitle: {
      color: "white",
      fontSize: "16px",
      fontWeight: "400",
   },
   grid2BoxSubtitle: {
      color: "white",
      fontSize: "12px",
      fontWeight: "300",
   },
   boxTitleBox: {
      fontWeight: "600",
   },
   form: {
      "& .MuiInputLabel-root": {
         fontWeight: "600 !important",
      },
      "& .MuiInputBase-root": {
         borderColor: "#D1D1DB !important",
      },
      "& .formTitleDiv": {
         marginBottom: "26px",
         "& .formTitle": {
            textAlign: "center",
            fontSize: "20px",
            marginTop: "18px",
            color: "#121127",
            fontWeight: "500 !important",
            marginBottom: "6px",
            [theme.breakpoints.down("md")]: {
               marginTop: "50px",
            },
         },
         "& .formSubtitle": {
            textAlign: "center",

            fontSize: "16px",
            color: "#8a8a8a",
            fontWeight: "400 !important",
         },
      },
      "& .checkBox": {
         "& .MuiTypography-root": {
            color: "#6C6B80",
            fontSize: "13px",
         },
      },
      "& .helpDiv": {
         textAlign: "start",
         display: "flex",
         columnGap: "8px",
         alignItems: "center",
         justifyContent: "start",
         fontSize: "13px",
         color: "#8a8a8a",
         "& .help": {
            color: "#0d48a5",
            textDecoration: "underline",
            cursor: "pointer",
         },
      },
      "& .buttonDiv": {
         "& button": {
            width: "100%",
            background: "#496AD0",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "600",
            "&:disabled": {
               background: "#E0E0E0 !important",
               color: "#00000042",
               "& svg": {
                  color: "#496AD0",
               },
            },
         },
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
   },
   emailDiv: {
      boxShadow: "0px 20px 50px 0px rgba(18, 17, 39, 0.08)",
      width: "450px",
      [theme.breakpoints.down("sm")]: {
         width: "auto",
      },
      borderRadius: "10px",
      background: "#fff",
   },
   invitationDiv: {
      width: "400px",
      maxHeight: "300px",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: {
         width: "100vw",
      },
   },
   emailHeader: {
      height: "95px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#6B86D7",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
      "& svg": {
         width: "44px",
         height: "32px",
         color: "#fff",
      },
   },
   emailBody: {
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      "& .check": {
         color: "#121127",
         fontSize: "18px",
         fontWeight: "600",
         marginBottom: "10px",
      },
      "& .info": {
         color: "#121127",
         fontSize: "14px",
         fontWeight: "300",
      },
   },
   emailButton: {
      "& button": {
         padding: "10px !important",
         background: "#496AD0",
         color: "#fff",
         height: "48px !important",
         "&:hover": {
            background: "#3f5bb4",
         },
         "&:disabled": {
            background: "#ddd",
         },
      },
      "& .time": {
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
         marginTop: "12px",
         fontSize: "14px",
      },
      "& .remaining": {
         textAlign: "center",
         color: "#9D9CAF",
         fontWeight: 300,
      },
   },
   confirmation: {
      border: "1.5px solid #11D18C",
      borderRadius: "6px",
      background: "#EAFFF5",
      padding: "18.5px 23.5px",
      color: "#0D6F60",
      fontSize: "14px",
      "& .confirmTitle": {
         fontWeight: "600",
      },
      "& .confirmInfo": {
         fontWeight: "300",
      },
   },
   otpDiv: {
      display: "flex",
      justifyContent: "space-between",
      "& input": {
         width: "50px",
         height: "45px",
         border: "1px solid #4C7CE5",
         textAlign: "center",
         borderRadius: "4px",
         background: "#F9F9FB",
         // outline: "none",
         // "&:focus-visible": {
         //   border: "2px solid #000 !important",
         // },
      },
   },
   forgotDiv: {
      boxShadow: "0px 20px 50px 0px rgba(18, 17, 39, 0.08)",
      background: "#fff",
      padding: "42px 1rem",
      borderRadius: "4px",
   },
   layoutDiv: {
      width: "370px",
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
         width: "auto",
      },
      rowGap: "25px",
      alignItems: "center",
      "& .Title": {
         color: "#000",
         fontSize: "18px",
         fontWeight: 600,
      },
      "& .Subtitle": {
         color: "#383751",
         fontSize: "14px",
      },
      "& .Message": {
         color: "#9D9CAF",
         fontSize: "14px",
         fontWeight: 300,
      },
   },
}));

export default styles;
