import { useNavigate } from "react-router-dom";

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(`${url}`);
  };
  return { handleNavigate };
};

export default useCustomNavigate;
