import { Search } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";

const useSearch = () => {
   const [search, setSearch] = useState("");
   const handleSetSearch = useCallback((e) => {
      setSearch(e.target.value);
   }, []);

   return {
      SearchBar: (
         <Box mb={2}>
            <TextField
               name="search_keyword"
               InputProps={{ startAdornment: <Search /> }}
               fullWidth
               placeholder="Search..."
               value={search}
               onChange={(e) => handleSetSearch(e)}
               sx={{
                  "& .MuiOutlinedInput-root": {
                     border: "2px solid #D1D1DB !important",
                     background: "#fff !important",
                  },
               }}
            />
         </Box>
      ),
      search,
   };
};

export default useSearch;
