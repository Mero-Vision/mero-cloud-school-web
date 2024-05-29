import { useSelector } from "react-redux";

const useCheckAdmin = () => {
   const { user } = useSelector((state) => state?.auth);
   const { company } = useSelector((state) => state?.utils);
   const checkAdmin = (id) => {
      const data = Number(company?.admin_id) === Number(id);
      return data;
   };
   const checkCompanyAdmin = (id) => {
      const data = Number(id) === Number(user?.id);
      return data;
   };
   const isAdmin = Number(company?.admin_id) === Number(user?.id);
   return { checkAdmin, isAdmin, checkCompanyAdmin };
};

export default useCheckAdmin;
