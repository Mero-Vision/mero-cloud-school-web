import { Box, Typography } from "@mui/material";
import styles from "./styles";

export const MainFooter = () => {
  const classes = styles();
  const date = new Date();
  //  const version = __APP_VERSION__;
  return (
    <Box className={classes.footer}>
      <Box>
        <Typography>
          Copyright © {date?.getFullYear()} Scodus. All rights reserved.
        </Typography>
      </Box>
      <Box>
        <Typography>
          Powered by{" "}
          <span
            style={{
              cursor: "pointer",
              color: "#4559BD",
              textDecoration: "underline",
            }}
            onClick={() => window.open("https://www.scodus.com", "_blank")}
          >
            Scodus Innovations
          </span>
        </Typography>
      </Box>
    </Box>
  );
};
