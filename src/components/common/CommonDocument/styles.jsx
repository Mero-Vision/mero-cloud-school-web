import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  documentContainer: {
    display: "flex",
    columnGap: "10px",
    flexWrap: "wrap",
  },
  rename: {
    "& input": {
      padding: "2px 5px !important",
      fontSize: "10px !important",
    },
    "& .MuiInputBase-root": {
      border: "2px solid #4e8af4 !important",
    },
    "& .buttons": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "5px",
    },
  },
  singleDocumentContainer: {
    minHeight: "110px",
    width: "110px",
    padding: "0.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    cursor: "pointer",
    transition: "100ms all ease-in-out",
    position: "relative",
    "& .documentIcon": {
      height: "45px",
      width: "45px",
      // color: "#5989C7",
    },
    "& .documentName": {
      fontSize: "11px",
      textAlign: "center",
      fontWeight: "400 !important",
      color: "rgba(0, 0, 0, 0.87)",
      height: "30px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      maxWidth: "6rem",
    },
    "& .documentOptions": {
      position: "absolute",
      top: 0,
      right: 0,
      visibility: "hidden",
      "& svg": {
        fontSize: "16px",
      },
    },
    "&:hover": {
      background: "#edeef1",
    },
    "&:hover .documentOptions": {
      visibility: "visible",
    },
  },

  documentNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    minHeight: "2.5rem",
    "& .breadcrumbs": { fontSize: "14px", cursor: "pointer" },
    "& .last": { color: "#4e8af4", cursor: "default" },
  },
  buttons: {
    display: "flex",
    columnGap: "10px",
    "& .fileUpload": {
      color: "#4e8af4",
      borderColor: "#4e8af4 !important",
    },
    "& .folderUpload": {
      background: "#4e8af4 !important",
    },
    "& button": {
      minWidth: "164px !important",
      fontSize: "11px",
      "& svg": {
        height: "16px",
        width: "16px",
      },
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
    rowGap: "13px",
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
  nofiles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "60vh",
    "& .icon": {
      background: "#D5DAE5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginBottom: "1rem",
    },
    "& img": {
      margin: "2rem",
      objectFit: "contain",
    },
    "& .text": {
      fontSize: "14px",
      fontWeight: "bold",
    },
  },
}));

export default styles;
