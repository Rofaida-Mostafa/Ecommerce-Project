import axios from "axios";
import { useMutation } from "react-query";

export default function useProductMutate() {
  async function getProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const getProductMutation = useMutation({
    mutationFn: getProducts,
  });
  return getProductMutation;
}
