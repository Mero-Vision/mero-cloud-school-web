import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
   root: {
      "& .textField": {
         "& .MuiInputBase-root": {
            border: "2px solid #fff !important",
         },
         "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff !important",
         },
         "& .input": {
            backgroundColor: "red !important",
         },
      },
      "& .title": {
         fontSize: "19px",
         fontWeight: "500 !important",
         color: theme.palette.text.main,
         marginBottom: "8px",
      },
      "& svg": {
         marginRight: "9px",
         height: "19px",
         width: "19px",
      },
   },
}));
export default styles;
