import { makeStyles } from "@mui/styles";
const styles = makeStyles((theme) => ({
   headerContainer: {
      // backgroundImage: `url(${background})`,
      // backgroundSize: "cover",
      backgroundColor: "#EDF5FF",
      paddingInline: "40px 80px",
      borderRadius: "8px",
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "167px",
      overflow: "hidden",
      boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
   },

   headerContainerCurrentOccupancy: {
      backgroundColor: "#fff",
      // paddingInline: "27px 80px",
      borderRadius: "8px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      height: "167px",
      padding: "20px 36px 20px 24px",

      overflow: "hidden",
      boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
      "& .gridTwoBox": {
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between",
         height: "100%",
         "& .gridTwoTitle": {
            fontSize: "16px",
            color: "#000",
            fontWeight: 600,
         },
         "& .gridTwoPercentage": {
            fontSize: "40px",
            color: "#4C7CE5",
            fontWeight: 700,
         },
      },
   },

   headerContainerPeakTime: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      overflow: "hidden",
      height: "167px",
      padding: "20px 20px 20px 24px",

      boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
      "& .buttonActiveLeft": {
         backgroundColor: "#E1F5FF",
         color: "#4559BD",
         border: "none",
         borderRadius: "8px 0px 0px 8px",
         height: "28px !important",
         "&:hover": {
            backgroundColor: "#E1F5FF",
         },
      },
      "& .buttonInactiveLeft": {
         backgroundColor: "#FBFBFB",
         color: "#6c6b63",
         border: "none",
         borderRadius: "8px 0px 0px 8px",
         height: "28px !important",

         "&:hover": {
            backgroundColor: "#FBFBFB",
         },
      },
      "& .buttonActiveRight": {
         backgroundColor: "#E1F5FF",
         color: "#4559BD",
         border: "none",
         borderRadius: "0px 8px 8px 0px",
         height: "28px !important",

         "&:hover": {
            backgroundColor: "#E1F5FF",
         },
      },
      "& .buttonInactiveRight": {
         backgroundColor: "#FBFBFB",
         color: "#6c6b63",
         border: "none",
         borderRadius: "0px 8px 8px 0px",
         height: "28px !important",

         "&:hover": {
            backgroundColor: "#FBFBFB",
         },
      },
   },

   mainDiv: {
      padding: "21px 0px",

      display: "flex",
      rowGap: "4px",
      flexDirection: "column",
      "& .date": {
         fontSize: "14px",
      },
      "& .title": {
         fontSize: "22px",
         color: "#134FC2",
      },
      "& .subtitle": {
         fontSize: "14px",
         color: "#6D6F73",
      },
      "& .startButton": {
         fontSize: "14px",
         width: "100px",
         color: "#fff",
         backgroundColor: "#4C7CE5",
         marginBottom: "5px",
      },
      "& .warning": {
         fontSize: "12px",
         color: "#FF6174",
         display: "flex",
         alignItems: "center",
         gap: "5px",
      },
   },
   imageDiv: {
      // height: "100%",
      // width: "200px",
      position: "absolute",
      right: 0,
      bottom: -8,
   },
   occupancyGridImageDiv: {
      // height: "100%",
      // width: "200px",
      position: "absolute",
      right: 0,
      bottom: -7,
   },
   singleCard: {
      borderRadius: "6px",
      background: "#fff",
      padding: "15px 10px",
      display: "flex",
      height: "100%",
      boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
      flexDirection: "column",
   },
   titleDiv: {
      "& .titleDevBox": {
         display: "flex",
         flexDirection: "column",
         gap: "2px",
         "& .titleHeader": {
            color: "#000",
            fontSize: "16px",
         },
      },
   },
}));

export default styles;
