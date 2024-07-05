import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
   drawer: {
      paddingInline: "10px",
      // marginBottom: "5rem",
      // backgroundColor: "red !important",
   },
   companyName: {
      padding: "15px 20px",
      display: "flex",
      columnGap: "10px",
      alignItems: "center",
      background: "#fff",
      position: "fixed",
      bottom: 0,
      borderRadius: "0 5px 0 5px",
      boxShadow: "-9px -2px 19px 0px rgba(39, 94, 235, .3)",
      "& img": {
         borderRadius: "50%",
         height: "30px",
         width: "30px",
         objectFit: "cover",
      },
   },
   drawerHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      columnGap: "7px",
      paddingBottom: "10px",
      borderBottom: "2px solid #e8e8e8",

      width: "100%",
      "& img": {
         height: "32px",
         width: "32px",
         objectFit: "contain",
      },
   },
   drawerContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingBlock: ".8rem",
   },
   nav: {
      borderLeft: "4px solid #4e7683 !important",

      "& > a": {
         transition: "all 0.3s ease-in-out",
         color: "#fff",
         textDecoration: "none",
      },
   },
   activeClass: {
      transition: "all 1s ease-in-out",
      color: "#4E7683 !important",
      "& > *": {
         background: "#edf8ff !important",
         borderRadius: "8px",
         // borderLeft: "4px solid #4E7683 !important",
      },
      "& .MuiTypography-root": {
         fontWeight: "600",
      },
   },
   inactiveClass: {
      transition: "all 1s ease-in-out",
      "& > *": {
         // borderLeft: "4px solid #4e7683 !important",
      },
      "& .MuiTypography-root": {
         fontWeight: "400",
      },
   },
   activeChildClass: {
      transition: "all 1s ease-in-out",
      color: "#000 !important",
      background: "#edf8ff !important",
      borderRadius: "5px !important",
      fontWeight: "bolder !important",
      position: "relative",

      "&::before": {
         content: '""',
         position: "absolute",
         top: "50%",
         left: "-8px",
         width: "9px",
         height: "1px",
         background: "#edf8ff",
         zIndex: -1,
      },

      "& .MuiTypography-root": {
         fontWeight: "600",
      },
   },

   listItemButton: {
      justifyContent: "initial",
      paddingInline: "10px !important",
      paddingBlock: "5px !important",
      fontSize: "13px",
   },
   listItemButtonChild: {
      justifyContent: "initial",
      paddingInline: "6px !important",
      paddingBlock: "0px !important",
      display: "flex",
      columnGap: "5px",
      borderRadius: "5px !important",
      fontSize: "13px",
      "& svg": {
         fontSize: "small",
      },
   },

   childContainer: {
      width: "max-content",
      paddingTop: "6px",
      borderLeft: "1px solid #4E7683",
      marginInline: "16px",
      paddingInline: "8px",
      "& button": {
         padding: "3px !important",
      },
   },
   iconButton: {
      borderRadius: "0 !important",
      "&:hover": {
         color: `${theme.palette.primary.main} !important`,
         background: `${theme.palette.primary.light} !important`,
      },
   },

   addAllContainer: {
      display: "flex",
      columnGap: "3rem",
      padding: "1rem",
      // justifyContent: "center",
      minWidth: "600px",

      "& button": {
         color: theme.palette.text.light,
         "&:hover": {
            "& svg": {
               transition: "200ms all ease-in-out",
               color: theme.palette.primary.main,
            },
         },
      },
   },
   title: {
      textTransform: "uppercase",
      marginBottom: "1rem",
      marginLeft: ".5rem",
   },
}));

export default useStyles;
