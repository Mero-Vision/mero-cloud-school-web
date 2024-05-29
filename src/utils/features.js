export const getToken = () => {
   const access_token = localStorage.getItem("account_access_token");
   const refresh_token = localStorage.getItem(
      "account_refresh_token"
   );
   console.log({ access_token, refresh_token });

   return {
      access_token,
      refresh_token,
   };
};
