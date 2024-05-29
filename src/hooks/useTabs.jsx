import { Search } from "@mui/icons-material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { Avatar, Box, Tab, Tabs, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components/common/CustomInputs/CustomInput";
import { setSearch } from "../rootRedux/utilsSlice";
import styles from "./styles";

const useTabs = ({
   data,
   button,
   cashInOut,
   isAccount,
   hideSearch,
   searchTitle,
   productSearch,
   pos,
}) => {
   const classes = styles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [value, setValue] = useState();

   useEffect(() => {
      setValue(data?.[0]?.value);
   }, [data?.[0]?.value]);

   const {
      control,
      formState: { errors },
      watch,
      reset,
   } = useForm({
      defaultValues: {
         search_keyword: "",
      },
   });
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   useEffect(() => {
      const timeout = setTimeout(() => {
         dispatch(setSearch(watch("search_keyword")));
      }, [1000]);
      return () => clearTimeout(timeout);
   }, [watch("search_keyword")]);

   const tabsComponent = () => {
      return (
         <Box className={classes.root}>
            <Box>
               {cashInOut && <Box>{cashInOut}</Box>}

               <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  sx={
                     pos
                        ? {
                             "& .MuiTab-root": {
                                color: "#FF9129 !important",
                             },
                             "& .Mui-selected": {
                                color: "#FF9129 !important",
                             },
                             "& .MuiTabs-indicator": {
                                background: "#FF9129 !important",
                             },
                          }
                        : {
                             "& .MuiTab-root": {
                                color: "#6C6B80 !important",
                             },
                             "& .Mui-selected": {
                                color: "#4E7683 !important",
                             },
                             "& .MuiTabs-indicator": {
                                background: "#4E7683 !important",
                             },
                          }
                  }
               >
                  {data?.map((item, index) => (
                     <Tab
                        key={index}
                        value={item?.value}
                        // icon={item?.icon}
                        icon={
                           item?.src ? (
                              <Avatar
                                 variant="square"
                                 alt="test avatar"
                                 src={item?.src}
                              />
                           ) : (
                              item?.icon
                           )
                        }
                        iconPosition={item?.position || "start"}
                        label={item?.label}
                     />
                  ))}
               </Tabs>
            </Box>

            <Box className={classes.rightSide}>
               {!hideSearch && (
                  <>
                     <Box>
                        <CustomInput
                           productSearch={productSearch}
                           control={control}
                           errors={errors}
                           name="search_keyword"
                           placeholder={
                              searchTitle ? searchTitle : "Search"
                           }
                           startIcon={<Search />}
                        />
                     </Box>
                  </>
               )}
               {isAccount && (
                  <Tooltip title="Tree View">
                     <Box
                        className={classes.treeViewContainer}
                        onClick={() => navigate("tree-view")}
                     >
                        <AccountTreeOutlinedIcon />
                     </Box>
                  </Tooltip>
               )}
               {button && <Box>{button}</Box>}
            </Box>
         </Box>
      );
   };

   return {
      value,
      Tabs: tabsComponent(),
      setTab: setValue,
   };
};

export default useTabs;
