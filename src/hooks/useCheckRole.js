import { useSelector } from "react-redux";

const useCheckRole = () => {
  const { user } = useSelector((state) => state?.auth);
  const checkRole = (roleToFind) => {
    const data = user?.role?.find(
      (item) => item?.toLowerCase() === roleToFind?.toLowerCase()
    );
    return data ? true : false;
  };
  return { checkRole };
};

export default useCheckRole;
