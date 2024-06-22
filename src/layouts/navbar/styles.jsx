import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   customerInfo: {
      background: "#fff",
      padding: "25px 50px",
      display: "flex",
      justifyContent: "space-between",
      "& .mainInfo": {
         display: "flex",
         columnGap: "15px",
         "& .avatar": {
            height: "45px",
            width: "45px",
            objectFit: "cover",
         },
         "& .name": {
            color: "#121127",
            fontSize: "16px",
            fontWeight: "500",
            marginBottom: "15px",
         },

         "& .infoDiv": {
            display: "flex",
            alignItems: "center",
            columnGap: "10px",
            marginBottom: "5px",
            "& > *": {
               color: "#4C4B63",
               fontSize: "12px",
               fontWeight: "400",
            },
            "& svg": {
               fontSize: "13px",
            },
         },
      },
      "& .amountInfo": {
         textAlign: "right",
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between",
         "& .totalAmount": {
            color: "#339AA2",
            fontSize: "22px",
            fontWeight: "600",
         },
         "& .totalAmountDue": {
            color: "#339AA2",
            fontSize: "18px",
            fontWeight: "600",
         },
         "& .payBtn": {
            backgroundColor: "#4C7CE5",
            color: "#fff",
            marginTop: "5px",
         },
         "& .receivableAmount": {
            color: "#6C6B80",
            fontSize: "12px",
            fontWeight: "400",
         },
         "& .buttonDiv": {
            display: "flex",
            columnGap: "10px",
            justifyContent: "end",
         },
      },
   },

   customerTable: {
      padding: "10px",
      marginTop: "20px",
      background: "#fff",
      "& .header": {
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
         paddingInline: "10px",
         "& .headerTitle": {
            color: "#2a7576",
            fontSize: "14px",
            fontWeight: "600",
         },
      },
   },
}));

export default styles;
