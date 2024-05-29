import { PrintOutlined } from "@mui/icons-material";
import { Box, Button, Fade, Typography } from "@mui/material";
import { memo } from "react";
import { useLocation } from "react-router-dom";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import styles from "./style";

function CustomPaper({ children, isPrint, modalTitle, icon, button }) {
  const classes = styles();
  const location = useLocation();
  const { handleNavigate } = useCustomNavigate();

  return (
    <Fade in>
      <div className={classes.paper}>
        {modalTitle && (
          <Box className={classes.modalHeader}>
            <Box className={classes.modalTitle}>
              {icon && <Box className={classes.icon}>{icon}</Box>}
              <Box>
                <Typography>{modalTitle}</Typography>
              </Box>
            </Box>

            <Box>
              {isPrint && (
                <Button
                  variant="outlined"
                  startIcon={<PrintOutlined />}
                  className={classes.printButton}
                  onClick={() =>
                    handleNavigate(
                      location?.search
                        ? location?.search + `&print=true`
                        : "?print=true"
                    )
                  }
                >
                  Print Preview
                </Button>
              )}
              {button}
            </Box>
          </Box>
        )}
        <Box p="20px">
          <Box>{children}</Box>
        </Box>
      </div>
    </Fade>
  );
}

export default memo(CustomPaper);
