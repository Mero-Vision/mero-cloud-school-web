import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles";

const useCommonTabs = ({ data, button }) => {
  const classes = styles();
  const [value, setValue] = useState(data?.[0]?.value);

  const {
    control,
    formState: { errors },
    watch,
  } = useForm({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabsComponent = () => {
    return (
      <Box className={classes.root}>
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
          >
            {data?.map((item, index) => (
              <Tab
                key={index}
                value={item?.value}
                icon={item?.icon}
                iconPosition={item?.position || "start"}
                label={item?.label}
              />
            ))}
          </Tabs>
        </Box>

        <Box className={classes.rightSide}>
          <Box>{button}</Box>
        </Box>
      </Box>
    );
  };

  return {
    value,
    setValue,
    Tabs: tabsComponent(),
  };
};

export default useCommonTabs;
