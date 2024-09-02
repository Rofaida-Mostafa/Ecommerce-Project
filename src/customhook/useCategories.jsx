import axios from "axios";
import { useQuery } from "react-query";

export default function useCategories() {
  async function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  //   const { data, isLoading, isError, error, isFetched } = useQuery({
  const res = useQuery({
    queryKey: "CategoryDetails",
    queryFn: getCategories,
  });

  //   return {
  //     isError,
  //     isLoading,
  //     isFetched,
  //     data,
  //     error,
  //   };

  return res;
}
