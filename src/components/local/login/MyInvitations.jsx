import { Cancel, CheckCircle, MailOutlined } from "@mui/icons-material";
import { Badge, Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  useAcceptMyInvitationMutation,
  useGetMyInvitationsQuery,
} from "../../../apis/companyApi";
import MailBox from "../../../assets/mailbox.svg";
import customToaster from "../../../utils/customToaster";
import { changeDateFormat, getError } from "../../../utils/helpers";
import CustomPopover from "../../common/CustomPopover/CustomPopover";
import IconTooltip from "../../common/CustomTooltips/IconTooltip";
import styles from "./styles";

const MyInvitations = () => {
  const classes = styles();
  const {
    data: invitations,
    isFetching,
    isSuccess,
  } = useGetMyInvitationsQuery();
  const [
    accept,
    {
      isLoading: isVerifyLoading,
      isSuccess: isVerifySuccess,
      error: verifyErrors,
      data: verifySuccessData,
    },
  ] = useAcceptMyInvitationMutation();
  const handleSubmit = (e, is_accepted, id) => {
    e.preventDefault();
    const data = {
      id,
      is_accepted,
    };

    accept(data);
  };
  useEffect(() => {
    if (isVerifySuccess) {
      customToaster({
        type: "success",
        message: verifySuccessData?.message || "Success",
      });
    }
  }, [isVerifySuccess]);
  useEffect(() => {
    getError(verifyErrors);
  }, [verifyErrors]);
  const organization = "This OrG";
  return (
    <CustomPopover
      ButtonComponent={
        <IconTooltip
          data={{
            title: "Invitations",
            icon: (
              <Badge
                badgeContent={invitations?.data?.length}
                sx={{
                  "& .MuiBadge-badge": {
                    background: "red",
                    color: "#fff",
                    fontSize: "8px",
                  },
                }}
              >
                <MailOutlined />
              </Badge>
            ),
          }}
        />
      }
      styleProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      }}
      component={
        <Box className={classes.invitationDiv}>
          {invitations?.data?.length ? (
            invitations?.data?.map((item, index) => (
              <Box key={index}>
                {" "}
                <Box
                  key={index}
                  sx={{
                    rowGap: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography className="info" sx={{ fontSize: "12px" }}>
                      <span
                        style={{
                          color: "#496AD0",
                          fontWeight: "500",
                        }}
                      >
                        {item?.data?.organization?.short_name}{" "}
                      </span>
                      has invited you to join.
                    </Typography>
                    <Typography sx={{ fontSize: "10px" }}>
                      •{" "}
                      {changeDateFormat(
                        item?.created_at,
                        "DD MMM YYYY (hh:mm A)"
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // columnGap: "10px",
                    }}
                    className={isVerifyLoading && "disableClick"}
                  >
                    <IconButton
                      onClick={(e) => handleSubmit(e, true, item?.id)}
                      className="checkCircle"
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#FF452B" }}
                      onClick={(e) => handleSubmit(e, false, item?.id)}
                    >
                      <Cancel />
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "5px",
                height: "auto",
                padding: "2rem",
              }}
            >
              <img
                src={MailBox}
                style={{
                  height: "150px",
                  width: "150px",
                  objectFit: "contain",
                }}
              />{" "}
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                No invitations yet.
              </Typography>
            </Box>
          )}
        </Box>
      }
    />
  );
};

export default MyInvitations;
