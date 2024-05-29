import { Delete } from "@mui/icons-material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { useEffect } from "react";
import customToaster from "../../../utils/customToaster";
import CustomModal from "./CustomModal";

const CustomApproveModal = ({
  open,
  handleClose,
  handleConfirm,
  isLoading,
  success,
  error,
  successData,
}) => {
  useEffect(() => {
    if (success) {
      customToaster({
        type: "success",
        message: successData?.message || "Success",
      });
      handleClose();
    }
  }, [success]);
  useEffect(() => {
    error?.data?.message &&
      customToaster({
        type: "error",
        message: error?.data?.message,
      });
  }, [error?.data?.message]);

  return (
    <>
      <CustomModal
        open={open}
        width={"500px"}
        height={"230px"}
        icon={<Delete />}
        handleClose={handleClose}
      >
        <Box>
          <Box>
            <Box
              style={{
                fontSize: "17px",
                textAlign: "center",
                margin: 0,
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <IconButton
                style={{
                  backgroundColor: "#e5f9f0",
                  width: "40px",
                  height: "40px",
                }}
              >
                <DoneOutlinedIcon style={{ color: "#00c770" }} />
              </IconButton>

              <p
                style={{
                  fontWeight: "500",
                  margin: 0,
                  padding: 0,
                  marginTop: "10px",
                }}
              >
                Do you want to approve this record?
              </p>

              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: "14px",
                  marginTop: "5px",
                  color: "#43434390",
                }}
              >
                This action is permanent and cannot be undone.
              </p>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              //   height: "60px",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={() => handleConfirm()}
              disabled={isLoading}
              style={{ backgroundColor: "#00c770", color: "white" }}
            >
              {isLoading ? (
                <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                  <CircularProgress size={15} style={{ color: "#fff" }} />
                  Approve
                </Box>
              ) : (
                "Approve"
              )}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleClose()}
              style={{ color: "#00c770", borderColor: "#00c770" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default CustomApproveModal;
