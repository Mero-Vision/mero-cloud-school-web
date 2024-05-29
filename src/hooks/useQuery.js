import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useQuery = (queryToSearch = "id") => {
  const [searchParams] = useSearchParams();
  const query = useMemo(
    () => searchParams.get(queryToSearch),
    [searchParams.get(queryToSearch)]
  );
  return { query };
};

export default useQuery;
